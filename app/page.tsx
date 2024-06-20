"use client";
import { useState, useEffect } from "react";

export default function Home() {

  const [consulta, setConsulta] = useState([]);
  const [bancoFiltrado, setBanco] = useState('');

  useEffect(() => {
    const consultarAPI = async() => {
      const url = 'https://dev.obtenmas.com/catom/api/challenge/banks';
      const response = await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          "Accept": 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials" : 'false',
          "Content-Type": "application/json"
        }
      });
      const respuesta = await response.json();
      respuesta.sort((a:any, b:any) => a.bankName !== b.bankName ? a.bankName < b.bankName ? -1 : 1 : 0);
      localStorage.setItem('listaBancos', JSON.stringify(respuesta));
      setConsulta(respuesta);
    }

    consultarAPI();
  },[]);

  //Borrar banco
  const borrarBanco = (bankName:string) => {
    console.log('borrando banco..');
    const nuevaConsulta = consulta.filter((banco:{bankName:string}) => banco.bankName !== bankName);
    setConsulta(nuevaConsulta);
  }

  //Filtrar banco
  const handleChange = (e:any) => {
    setBanco(e.target.value);
  };

  let bancosFiltrados = [];

  if (bancoFiltrado !== "") {
    bancosFiltrados = consulta.filter((banco:{bankName:string}) => banco.bankName.toLowerCase().includes(bancoFiltrado.toLowerCase()));
  }else{
    bancosFiltrados = consulta;
  }

  return (
    <main className="min-h-screen bg-slate-950 p-24">
      <div className="mb-6">
        <label htmlFor="buscar-banco" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Buscar banco</label>
        <input 
        type="text"
        id="buscar-banco" 
        onChange={handleChange} 
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
    </div>
      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-between mt-12">

      {bancosFiltrados.length > 0 
      ? bancosFiltrados.map((banco:any, age) => (
          <div className="border border-slate-500 rounded-md p-2 h-72 flex flex-col justify-around" key={age}>
            <img className="w-full max-w-20" src={banco.url} alt={banco.bankName} />
            <p>Nombre: {banco.bankName}</p>
            <p>Descripción: {banco.description}</p>
            <p>Edad: {banco.age}</p>
            <button onClick={ () => borrarBanco(banco.bankName)} className="rounded-md p-2 bg-red-600">Borrar banco</button>
          </div>
        ))
      : <p>No hay datos</p>
      }

      </div>
    </main>
  );
}
