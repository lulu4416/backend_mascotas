import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  GenerarContrasena(){
    let contrasena = generador (8, false);
    return contrasena;
  }

  CifrarContrasena(contrasena: string){
    let contrasenacifrada = cryptoJS.MD5(contrasena).toString();
    return contrasenacifrada;
  }
}
