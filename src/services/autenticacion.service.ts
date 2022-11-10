import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {Llaves} from '../config/llaves';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuarioRepository)
    public UsuarioRepository: UsuarioRepository
  ) { }

  /*
   * Add service methods here
   */
  GenerarContrasena() {
    let contrasena = generador(8, false);
    return contrasena;
  }

  CifrarContrasena(contrasena: string) {
    let contrasenacifrada = cryptoJS.MD5(contrasena).toString();
    return contrasenacifrada;
  }

  IdentificarUsuario(usuario: string, contrasena: string) {
    try {
      let u = this.UsuarioRepository.findOne({where: {correo: usuario, contrasena: contrasena}});
      if (u) {
        return u;
      }
      return false;

    } catch {
      return false
    }
  }

  GenerarTokenJWT(Usuario: Usuario) {
    let token = JWT.sing({
      data: {
        id: Usuario.id,
        nombre:Usuario.nombre + " " + Usuario.apellido,
        correo:Usuario.correo
      }
    },
    Llaves.claveJWT);
  return token;
  }

  ValidarTokenJWT(token: string) {
    try{
      let datos = JWT.verify(token, Llaves.claveJWT);
      return datos;
    } catch{
      return false;
    }
  }
}
