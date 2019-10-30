const fs = require('fs');

let listadoPorHacer = [];

const guardarBD = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`base-datos/data.json`, data, (err) => {
        if (err) throw new Error('Error al grabar en base de datos', err);
    });
}

const cargarBD = () => {

    try {
        listadoPorHacer = require('../base-datos/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

const crear = (descripcion) => {
    cargarBD();

    let porHacer = {
        descripcion, //descripcion : descripcion
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarBD();
    return porHacer;

}

const getListado = () => {
    cargarBD(); //cargar la lista de la base de datos
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarBD();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarBD();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {
    cargarBD();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarBD();
        return true;
    }
}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}