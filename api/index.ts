const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User.ts');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const Post = require('./models/Post.ts');
const salt = bcrypt.genSaltSync(10);
const fs = require('fs');
const secret = "JesusIsKing";

app.use(cors({credentials:true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect('mongodb+srv://JohnnyLima67:Casa2000*@bloggingapp.0s5ktrc.mongodb.net/?retryWrites=true&w=majority&appName=BloggingApp');

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try{
    //console.log({ username, password });
    const userDoc = await User.create({ username, password: bcrypt.hashSync(password, salt), role: 'user' });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  console.log(userDoc);
  try{
    //console.log({ username, password });
    if(!userDoc) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = bcrypt.compareSync(password, userDoc.password);
    if(!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    jwt.sign({ username, id: userDoc._id, role: userDoc.role }, secret, { expiresIn: '1h' }, (error, token) => {
      if (error) return res.status(500).json({ message: 'Token generation failed' });
      res.cookie('token', token).json({ id: userDoc._id, username: userDoc.username, role: userDoc.role });
    });
  } catch (error) {
    res.status(400).json(error);
  }
})

app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if(err) throw err;
    res.json(info);
    //console.log(info);
  });
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  const {originalname, path} = req.file;
  const parts = originalname.split('.')
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);
  const {token} = req.cookies;

  jwt.verify(token, secret, {}, async (err, info) => {
    if(err) throw err;
    const postDoc = await Post.create({
      author: info.id,
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
      file: newPath,
    });
    res.json(postDoc);
  });
});

app.get('/posts', async (req, res) => {
  const posts = await Post.find().populate('author', ['username']).sort({createdAt: -1}).limit(20);
  //console.log(posts);
  res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
});


app.put('/posts/:id', uploadMiddleware.single('file'), async (req, res) => {
  console.log('entrou');
  let newPath = null;
  if (req.file) {
    const {originalname, path} = req.file;
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
  }
  const {id} = req.params;
  const {token} = req.cookies;

jwt.verify(token, secret, {}, async (err, info) => {
  if (err) {
    console.error('Erro ao verificar token:', err.message);
    return res.status(401).json({ error: 'Token inválido ou ausente' });
  }

  try {
    const postDoc = await Post.findByIdAndUpdate(id, {
      author: info.id,
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
      file: newPath,
    });
    res.json(postDoc);
  } catch (dbErr) {
    console.error('Erro ao atualizar post:', dbErr.message);
    res.status(500).json({ error: 'Erro interno ao atualizar post' });
  }
});
});

app.delete('/posts/:id', async (req, res) => {
  const {id} = req.params;
  const {token} = req.cookies;

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const postDoc = await Post.findByIdAndDelete(id);
    res.json(postDoc);
  });
});

app.listen(4000);