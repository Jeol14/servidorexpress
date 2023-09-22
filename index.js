
// SERVIDOR EXPRESS
const fs=require('fs');
const express=require('express')
const app = express()
const port = 3005

//middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

//metodo post
app.post('/formulario',(req, res)=>{
    
    const {id,nombre,apellido,titulo,autor,editorial,año} = req.body
    console.log(req.body);

    if (!id || !nombre || !apellido || !titulo || !autor || !editorial || !año) return res.redirect('/error.html');
    
    const data = `ID: ${id}, Nombre: ${nombre}, Apellido: ${apellido}, Titulo: ${titulo}, Autor: ${autor}, Editorial: ${editorial}, Año: ${año}`;

    const nombreData = `data/id_${id}.txt`;

    const mensajeExito = "Datos guardados con éxito.";

    fs.writeFile(nombreData, data, () => {        
        res.download(nombreData, () => { 
                       
        });
    });
    
    res.send(mensajeExito + `ID: ${id}, Nombre: ${nombre}, Apellido: ${apellido}, Titulo: ${titulo}, Autor: ${autor}, Editorial: ${editorial}, Año: ${año}`)
})
app.listen(port,()=>console.log(`Servidor corriendo en puerto ${port}`))