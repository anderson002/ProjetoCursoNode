const express = require('express');
const UserModel = require("../src/models/user.model");

const app = express();

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use((req, res, next) => {
  console.log(`Request Type: ${req.method}`);
  console.log(`Content Type: ${req.headers['content-type']}`);
  console.log(`Date Type: ${new Date()}`);

  next();
});

app.get('/views/users', async (req, res) => {
  const users = await UserModel.find({})
  res.render('index', {users});
});

app.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find({});

    res.status(200).json(users)
  } catch (error) {
return res.status(500).send(error.message);
  }
});

app.get("/users/:id", async (req, res) => {
  try{
    const id = req.params.id;

    const user = await UserModel.findById(id);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// app.post('/users', async (req, res) => {
// try {
//     const user = await UserModel.create(req.body)

//     const retorno = {
//       user: user,
//       mensagem: "Usuário cadastrado com sucesso"
//     }
//     res.status(201).json(retorno)
// } catch (error) {
//     console.error(error.message)
//     const retorno = {
//       user: null,
//       mensagem: "Ocorreu um erro ao salvar o usuário"
//     }

//     res.status(500).send(retorno);
// }
// })

app.post('/users', async (req, res) => {
  const objUsers = req.body

  try {
     const email = await UserModel.find({filter: {email: objUsers.email}})
     
     console.log(email) 

    if(email === null || undefined){
           const newUser = await UserModel.create(objUsers)
  
      return res.status(200).json(newUser)
    } else{
      return res.status(400).json({message: "Este e-mail já esta cadastrado pau no cu burlador de regras!"})
    }

  } catch (error) {
    return res.status(400).json(error);
  }
})
  

app.patch('/users/:id', async (req,res) => {
  try {
    const id = req.params.id
    
    const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const user = await UserModel.findByIdAndRemove(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}); 

const port = 8080;

app.listen(port, ()  => console.log(`Rodando com Express na porta ${port}!`));