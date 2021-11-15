const { request, response } = require('express');
const Usuario               = require('../../models/userModel');
const Archivo               = require('../../models/archivoModel'); 
const { uploadToBucket,
        deleteFileToBucket} = require('../../helpers/upload-aws');
const { findById }          = require('../../models/userModel');


const obtenerFile = async(req, res) => {

    const id = req.usuario;
   
    try{
        const data = await Archivo.find({creador: id, estado: true}); 
        res.status(200).json({
            data
        })
    
    }catch(error){
        res.status(200).json({
            msg: "existio un error"
        })
    }

}   


const upload = async (req = request, res = response) => {
    
    const nameBucket = process.env.BUCKET_NAME;
    const file = req.files.archivo;
    const creadorId = req.usuario; 
   
    try {
        //carga solo texto plano txt
        const extencionValida = ['txt'];
        const nameCorte  = file.name.split('.');
        const extencion = nameCorte[nameCorte.length-1];
        if(!extencionValida.includes(extencion)){
           return res.status(400).json({
                msg: 'El archivo no es del formato correcto'
            })
        }
        
        const usuario = await Usuario.findById(creadorId);
        if( !usuario ){
            return res.status.json({
                msg: "Existio un error"
            });
        }
        const nombre = usuario.nombre;
       
        // guardar archivo 
        const result = await uploadToBucket (nameBucket, file);
        if( !result ){
            return res.status.json({
                msg: "Existio un error en aws"
            });
        }  
        const referencia = result.location;
        const namefile = result.key;    

        const archivo = new Archivo();
        archivo.creador = creadorId;
        archivo.dueño = nombre;
        archivo.referencia = referencia;
        archivo.nombre = namefile;
        
        await archivo.save();

        res.status(200).json({
            msg: "Se cargo el archivo correctamente"
        })

    } catch (error) {
        res.status(400).json({
            msg: "Existio un problema en la carga"
        })
    }

}


const deleteFile = async (req, res) => {
   const {id} = req.params;
   const nameBucket = process.env.BUCKET_NAME;
   const fecha = new Date();
    try {
        //borron en aws
        const dato =  await Archivo.findById(id);
        const nombre =  dato.nombre;
        const result = await deleteFileToBucket(nameBucket, nombre);
        if(!result){
            res.status(400).json({
                msg: "existe un problema con aws"
            })
        }
        await Archivo.findByIdAndUpdate(id, {estado: false, borrado: fecha}); 
        res.status(200).json({
            msg: "Archivo eliminado correctamente"
        })
    
    } catch (error) {
        res.status(400).json({
            msg: "Exisio un problema al borrar el archivo"
        })
    }
}

module.exports = {
    upload,
    deleteFile,
    obtenerFile
}

