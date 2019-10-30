función  setProto ( A , B ) {
  Una . prototipo  =  objeto . crear (
    B . prototipo ,
    { constructor : {
      configurable: verdadero,
      grabable: verdadero,
      valor: A
    }}
  );
}

wru . prueba ( typeof  documento  ===  ' indefinido '  ? [] : [
  {
    nombre :  ' V1: main ' ,
    prueba :  función () {
      wru . afirmar ( typeof customElements ===  ' objeto ' );
    }
  }, {
    nombre :  ' V1: is = "x-name" es minúscula ' ,
    prueba :  función () {
      función  MyParagraph ( self ) {
        prueba {
          self =  HTMLParagraphElement . llamada (self ||  this );
        } captura (e) {
          auto =  reflexionar . construcción ( HTMLParagraphElement , [], MyParagraph);
        }
        volver a sí mismo;
      }
      setProto (MyParagraph, HTMLParagraphElement );
      elementos personalizados . define ( ' mi-párrafo ' , MyParagraph, {extiende :  ' p ' });
      var elem =  nuevo  MyParagraph ();
      setTimeout ( wru . async ( function () {
        wru . afirmar ( ' atributo correcto ' ,
          elem . getAttribute ( ' es ' ) ===  ' mi-párrafo '  ||
          / ^ <p \ s + is = (' | ") mi-párrafo \ 1 > < \ / p> $ / i . test ( elem . externalHTML )
        );
      }), 50 );
    }
  }, {
    nombre :  ' V1: los atributos se notifican correctamente ' ,
    prueba :  función () {
      función  XTag ( self ) {
        prueba {
          self =  HTMLElement . llamada (self ||  this );
        } captura (e) {
          auto =  reflexionar . construcción ( HTMLElement , [], XTag);
        }
        volver a sí mismo;
      }
      setProto (XTag, HTMLElement );
      XTag . observeAttributes  = [ ' x ' ];
      llamadas var = [];
      XTag . prototipo . attributeChangedCallback  =
        función ( attr , old , value ) {
          llamadas . push ([attr, viejo, valor]);
        };
      documento . cuerpo . appendChild (
        documento . createElement ( ' etiqueta x ' )
      ) setAttribute ( ' x ' , ' 1 ' );
      elementos personalizados . define ( ' etiqueta x ' , XTag);
      var xtag =  documento . cuerpo . lastChild ;
      xtag . setAttribute ( ' x ' , ' 2 ' );
      setTimeout ( wru . async ( function () {
        wru . afirmar ( ' llamadas correctas ' , llamadas . longitud  ===  2 );
        wru . afirmar ( ' primera llamada correcta ' , llamadas [ 0 ] [ 0 ] ==  ' x '  && llamadas [ 0 ] [ 1 ] ==  nulo  && llamadas [ 0 ] [ 2 ] ==  ' 1 ' );
        wru . afirmar ( ' segunda llamada correcta ' , llamadas [ 1 ] [ 0 ] ==  ' x '  && llamadas [ 1 ] [ 1 ] ==  ' 1 '  && llamadas [ 1 ] [ 2 ] ==  ' 2 ' );
      }), 50 );
    }
  }, {
    nombre :  ' V1: use clases extendidas para registrarse ' ,
    prueba :  función () {
      función  MyButton ( self ) {
        // necesario para actualizar el elemento
        prueba {
          self =  HTMLButtonElement . llamada (self ||  this );
        } captura (e) {
          auto =  reflexionar . construcción ( HTMLButtonElement , [], MyButton);
        }
        auto . setAttribute ( ' cool ' , ' true ' );
        volver a sí mismo;
      }
       método de función () {}
      setProto (MyButton, HTMLButtonElement );
      Mi botón . prototipo . método  = método;
      elementos personalizados . define ( ' mi-botón ' , MyButton, { ' extiende ' :  ' botón ' });
      var myButton =  nuevo  MyButton ();
      wru . afirmar ( ' prototipo heredado ' , myButton . método  === método);
      setTimeout ( wru . async ( function () {
        wru . afirmar ( ' constructor llamado ' , myButton . getAttribute ( ' cool ' ) ===  ' verdadero ' );
      }), 100 );
    }
  }, {
    nombre :  ' V1: uso extendido para registrarse y DOM para inicializar ' ,
    prueba :  función () {
      var onceCreated =  wru . async ( función ( myButton ) {
        documento . cuerpo . removeChild (myButton);
        wru . afirmar ( ' constructor llamado ' , myButton . getAttribute ( ' cool ' ) ===  ' verdadero ' );
        wru . afirmar ( ' prototipo heredado ' , myButton . método  === método);
      });
      función  MyOtherButton ( self ) {
        prueba {
          self =  HTMLButtonElement . llamada ( esto mismo);
        } captura (e) {
          auto =  reflexionar . construcción ( HTMLButtonElement , [], MyOtherButton);
        }
        auto . setAttribute ( ' cool ' , ' true ' );
        setTimeout ( function () {
          onceCreated (self);
        }, 100 );
        volver a sí mismo;
      }
       método de función () {}
      setProto (MyOtherButton, HTMLButtonElement );
      MyOtherButton . prototipo . método  = método;
      elementos personalizados . define ( ' mi-otro-botón ' , MyOtherButton, { ' extiende ' :  ' botón ' });
      documento . cuerpo . appendChild ( document . createElement ( ' button ' , {is :  ' my-other-button ' }));
    }
  }, {
    nombre :  ' V1: clases reales ' ,
    prueba :  función () {
      prueba {
        Función ( ' wru ' , [
          ' clase MyA extiende HTMLAnchorElement {constructor (self) {self = super (self); self.setAttribute ("ok", "1"); volver a sí mismo; }} ' ,
          ' customElements.define ("my-a", MyA, {"extend": "a"}); ' ,
          ' const myA = nuevo MyA (); ' ,
          ' setTimeout (wru.async (function () {wru.assert (myA.getAttribute ("ok") === "1");}), 100); '
        ] unirse ( ' \ n ' )). llamada ( esto , wru);

      } atrapar (meh) {}
    }
  }, {
    nombre :  ' V1: customElements.whenDefined ' ,
    prueba :  función () {
      función  HereWeGo () {}
      setProto (HereWeGo, HTMLElement );
      elementos personalizados . whenDefined ( ' aquí-vamos ' ). entonces ( wru . async ( function () {
        wru . afirmar ( customElements . get ( ' here-we-go ' ) === HereWeGo);
      }));
      setTimeout ( function () {
        elementos personalizados . define ( ' aquí-vamos ' , HereWeGo);
      }, 100 );
    }
  }, {
    nombre :  ' V1: connectedCallback ' ,
    prueba :  función () {
      function  OnceAttached ( self ) {
        prueba {
          devolver  HTMLElement . llamada ( esto mismo);
        } captura (e) {
          volver  Reflexionar . construcción ( HTMLElement , [], OnceAttached);
        }
      }
      setProto (OnceAttached, HTMLElement );
      OnceAttached . prototipo . connectedCallback  =  wru . async ( function () {
        documento . cuerpo . removeChild ( esto );
        wru . afirmar ( ' OK ' );
      });
      elementos personalizados . define ( ' una vez adjunto ' , OnceAttached);
      var el =  new  OnceAttached ;
      setTimeout ( function () {
        documento . cuerpo . appendChild (el);
      }, 100 );
    }
  }, {
    nombre :  ' V1: desconectadoCallback ' ,
    prueba :  función () {
      function  OnceDetached ( self ) {
        prueba {
          devolver  HTMLElement . llamada ( esto mismo);
        } captura (e) {
          volver  Reflexionar . construcción ( HTMLElement , [], OnceDetached);
        }
      }
      setProto (OnceDetached, HTMLElement );
      OnceDetached . prototipo . disconnectedCallback  =  wru . async ( function () {
        wru . afirmar ( ' OK ' );
      });
      elementos personalizados . define ( ' una vez separado ' , OnceDetached);
      var el =  documento . cuerpo . appendChild ( nuevo  OnceDetached );
      setTimeout ( function () {
        documento . cuerpo . removeChild (el);
      }, 100 );
    }
  }, {
    nombre :  ' V1: attributeChangedCallback ' ,
    prueba :  función () {
      var args = [];
      función  OnAttrModified ( self ) {
        prueba {
          devolver  HTMLElement . llamada ( esto mismo);
        } captura (e) {
          volver  Reflexionar . construcción ( HTMLElement , [], OnAttrModified);
        }
      }
      OnAttrModified . observeAttributes  = [ ' prueba ' ];
      setProto (OnAttrModified, HTMLElement );
      OnAttrModified . prototipo . attributeChangedCallback  =  function () {
        args . empujar ( argumentos );
      };
      elementos personalizados . define ( ' on-attr-modified ' , OnAttrModified);
      var el =  documento . cuerpo . appendChild ( nuevo  OnAttrModified );
      el . setAttribute ( ' nope ' , ' nope ' );
      el . setAttribute ( ' prueba ' , ' attr ' );
      setTimeout ( wru . async ( function () {
        documento . cuerpo . removeChild (el);
        wru . afirmar (
          args . longitud  ===  1  &&
          args [ 0 ] [ 0 ] ===  ' prueba '  &&
          args [ 0 ] [ 1 ] ==  nulo  &&
          args [ 0 ] [ 2 ] ===  ' attr '
        );
      }), 100 );
    }
  }, {
    nombre :  ' V1: instancia conservada de ' ,
    prueba :  función () {
      wru . afirmar ( document . createElement ( ' botón ' ) instanciade  HTMLButtonElement );
    }
  }, {
    nombre :  ' V1: atributos notificados en bootstrap ' ,
    prueba :  función () {
      notificación var ;
       Atributos de función notificados ( self ) {
        prueba {
          devolver  HTMLElement . llamada ( esto mismo);
        } captura (e) {
          volver  Reflexionar . construcción ( HTMLElement , [], AttributesNotified);
        }
      }
      Atributos Notificados . observeAttributes  = [ ' algunos ' ];
      setProto (AttributesNotified, HTMLElement );
      Atributos Notificados . prototipo . attributeChangedCallback  =  function ( name , oldValue , newValue ) {
        notificación = {
          nombre : nombre,
          oldValue : oldValue,
          newValue : newValue
        };
      };
      Atributos Notificados . prototipo . connectedCallback  =  wru . async ( function () {
        esta . parentNode . removeChild ( esto );
        wru . afirmar (
          la notificación . nombre  ===  ' algunos '  &&
          la notificación . oldValue  ===  nulo  &&
          la notificación . newValue  ===  ' cosa '
        );
      });
      setTimeout ( function () {
        var div =  documento . cuerpo . appendChild ( document . createElement ( ' div ' ));
        div . innerHTML  =  ' <atributos-modificado alguna = "cosa"> prueba </attributes-modified> ' ;
        elementos personalizados . define ( ' atributos modificados ' , Atributos notificados);
      });
    }
  }, {
    nombre :  " V0: attributeChangedCallback con valores vacíos " ,
    prueba :  función () {
      var hecho =  wru . asíncrono ( función ( condición ) {
        wru . afirmar (condición);
      });
      documento . registerElement (
        ' attr-changed ' , {
        prototipo :  objeto . crear (
          HTMLElement . prototipo , {
            attributeChangedCallback : { value :  function (
              nombre ,            // siempre presente
              previousValue ,   // si es nulo, es un nuevo atributo
              valor            // si es nulo, es un atributo eliminado
            ) {
              hecho (
                nombre ===  ' prueba '  &&
                previousValue ===  nulo  &&
                valor ===  ' '
              );
            }}
          }
        )
      });
      var el =  documento . createElement ( ' attr-changed ' );
      documento . cuerpo . appendChild (el). setAttribute ( ' prueba ' , ' ' );
    }
  }, {
    nombre :  " V0: main " ,
    prueba :  función () {
      wru . afirmar ( ' registerElement exist ' , documento . registerElement );
      var XDirect =  ventana . XDirect  =  documento . registerElement (
        ' x-direct ' ,
        {
          prototipo :  objeto . crear (
            HTMLElement . prototipo , {
            createdCallback : { value :  function () {
              esta . _info  = [{
                tipo :  ' creado ' ,
                argumentos :  argumentos
              }];
            }},
            attachCallback : { value :  function () {
              esta . _info . empujar ({
                tipo :  ' adjunto ' ,
                argumentos :  argumentos
              });
            }},
            detachedCallback : { value :  function () {
              esta . _info . empujar ({
                tipo :  ' separado ' ,
                argumentos :  argumentos
              });
            }},
            attributeChangedCallback : { value :  function (
              nombre ,            // siempre presente
              previousValue ,   // si es nulo, es un nuevo atributo
              valor            // si es nulo, es un atributo eliminado
            ) {
              esta . _info . empujar ({
                tipo :  ' attributeChanged ' ,
                argumentos :  argumentos
              });
            }}
          })
        }
      );

      var XIndirect =  ventana . XIndirect  =  documento . registerElement (
        ' x-indirecto ' ,
        {
          ' extend ' :  ' div ' ,
          prototipo :  objeto . crear (
            HTMLDivElement . prototipo , {
            createdCallback : { value :  function () {
              esta . _info  = [{
                tipo :  ' creado ' ,
                argumentos :  argumentos
              }];
            }},
            attachCallback : { value :  function () {
              esta . _info . empujar ({
                tipo :  ' adjunto ' ,
                argumentos :  argumentos
              });
            }},
            detachedCallback : { value :  function () {
              esta . _info . empujar ({
                tipo :  ' separado ' ,
                argumentos :  argumentos
              });
            }},
            attributeChangedCallback : { value :  function (
              nombre ,            // siempre presente
              previousValue ,   // si es nulo, es un nuevo atributo
              valor            // si es nulo, es un atributo eliminado
            ) {
              esta . _info . empujar ({
                tipo :  ' attributeChanged ' ,
                argumentos :  argumentos
              });
            }}
          })
        }
      );

      wru . afirmar ( ' registerElement devuelve una función ' ,
        typeof XDirect ===  ' función '  &&
        typeof XIndirect ===  ' función '
      );

    }
  }, {
    nombre :  ' V0: observar los cambios cuando se adjunta a V1 Shadow Root ' ,
    prueba :  función () {
      if ( ! HTMLElement . prototype . attachShadow ) devuelve ;
      var
        a =  nuevo  XDirect (),
        parentNode =  documento . createElement ( ' div ' ),
        root =  parentNode . attachShadow ({modo :  ' abierto ' })
      ;
      raíz . appendChild (a);
      setTimeout ( wru . async ( function () {
        wru . afirmar ( ' nodo creado ' , a . _info [ 0 ]. tipo  ===  ' creado ' );
        if ( a . _info [ 1 ]) wru . afirmar ( ' nodo adjunto ' , a . _info [ 1 ]. tipo  ===  ' adjunto ' );
      }), 100 );
    }
  }, {
    nombre :  ' V0: como constructor XDirect ' ,
    prueba :  función () {
      var nodo =  documento . cuerpo . appendChild ( nuevo  XDirect );
      wru . afirmar ( ' nombre correcto ' , nodo . nombreDenodo . toUpperCase () ===  ' X-DIRECT ' );
      wru . afirmar ( ' createdInvoked ' , nodo . _info [ 0 ]. type  ===  ' created ' );
      wru . afirmar ( ' es instancia ' ,
instancia de         nodo de XDirect ||
        // IE <11 donde setPrototypeOf está ausente
        Objeto . getPrototypeOf ( XDirect . prototype ). isPrototypeOf (nodo)
      );
    }
  }, {
    nombre :  ' V0: como constructor XIndirect ' ,
    prueba :  función () {
      var nodo =  documento . cuerpo . appendChild ( nuevo  XIndirect );
      wru . afirmar ( ' nombre correcto ' , nodo . nombreDenodo . toUpperCase () ===  ' DIV ' );
      wru . afirmar ( ' tipo correcto ' , nodo . getAttribute ( ' es ' ) ===  ' x-indirecto ' );
      wru . afirmar ( ' createdInvoked ' , nodo . _info [ 0 ]. type  ===  ' created ' );
      wru . afirmar ( ' es instancia ' ,
instancia de         nodo de XIndirect ||
        // IE <11 donde setPrototypeOf está ausente
        Objeto . getPrototypeOf ( XIndirect . prototype ). isPrototypeOf (nodo)
      );
    }
  }, {
    nombre :  ' V0: como & lt; x-direct & gt; innerHTML ' ,
    prueba :  función () {
      var nodo =  documento . cuerpo . appendChild ( document . createElement ( ' div ' ));
      nodo . innerHTML  =  ' <x-direct> </x-direct> ' ;
      nodo =  nodo . firstChild ;
      wru . afirmar ( ' nombre correcto ' , nodo . nombreDenodo . toUpperCase () ===  ' X-DIRECT ' );
      setTimeout ( wru . async ( function () {
        wru . afirmar ( ' devolución de llamada creada activada ' , nodo . _info [ 0 ]. tipo  ===  ' creado ' );
        wru . afirmar ( ' devolución de llamada adjunta activada ' , nodo . _info [ 1 ]. tipo  ===  ' adjunto ' );
        documento . cuerpo . removeChild ( nodo . parentNode );
        setTimeout ( wru . async ( function () {
          wru . afirmar ( ' devolución de llamada desconectada ' , nodo . _info [ 2 ]. tipo  ===  ' desconectado ' );
        }), 20 );
      }), 20 );
    }
  }, {
    nombre :  ' V0: como & lt; div es = "x-indirecto" & gt; innerHTML ' ,
    prueba :  función () {
      var nodo =  documento . cuerpo . appendChild ( document . createElement ( ' div ' ));
      nodo . innerHTML  =  ' <div es = "x-indirecto"> </div> ' ;
      nodo =  nodo . firstChild ;
      wru . afirmar ( ' nombre correcto ' , nodo . nombreDenodo . toUpperCase () ===  ' DIV ' );
      wru . afirmar ( ' tipo correcto ' , nodo . getAttribute ( ' es ' ) ===  ' x-indirecto ' );
      setTimeout ( wru . async ( function () {
        wru . afirmar ( ' devolución de llamada creada activada ' , nodo . _info [ 0 ]. tipo  ===  ' creado ' );
        wru . afirmar ( ' devolución de llamada adjunta activada ' , nodo . _info [ 1 ]. tipo  ===  ' adjunto ' );
        documento . cuerpo . removeChild ( nodo . parentNode );
        setTimeout ( wru . async ( function () {
          wru . afirmar ( ' devolución de llamada desconectada ' , nodo . _info [ 2 ]. tipo  ===  ' desconectado ' );
        }), 20 );
      }), 20 );
    }
  }, {
    nombre :  ' V0: como createElement (x-direct) ' ,
    prueba :  función () {
      var nodo =  documento . cuerpo . appendChild ( document . createElement ( ' div ' )). appendChild (
        documento . createElement ( ' x-direct ' )
      );
      wru . afirmar ( ' nombre correcto ' , nodo . nombreDenodo . toUpperCase () ===  ' X-DIRECT ' );
      setTimeout ( wru . async ( function () {
        wru . afirmar ( ' devolución de llamada creada activada ' , nodo . _info [ 0 ]. tipo  ===  ' creado ' );
        wru . afirmar ( ' devolución de llamada adjunta activada ' , nodo . _info [ 1 ]. tipo  ===  ' adjunto ' );
        documento . cuerpo . removeChild ( nodo . parentNode );
        setTimeout ( wru . async ( function () {
          wru . afirmar ( ' devolución de llamada desconectada ' , nodo . _info [ 2 ]. tipo  ===  ' desconectado ' );
        }), 20 );
      }), 20 );
    }
  }, {
    nombre :  ' V0: como createElement (div, x-indirecto) ' ,
    prueba :  función () {
      var nodo =  documento . cuerpo . appendChild ( document . createElement ( ' div ' )). appendChild (
        documento . createElement ( ' div ' , ' x-indirecto ' )
      );
      wru . afirmar ( ' nombre correcto ' , nodo . nombreDenodo . toUpperCase () ===  ' DIV ' );
      wru . afirmar ( ' tipo correcto ' , nodo . getAttribute ( ' es ' ) ===  ' x-indirecto ' );
      setTimeout ( wru . async ( function () {
        wru . afirmar ( ' devolución de llamada creada activada ' , nodo . _info [ 0 ]. tipo  ===  ' creado ' );
        wru . afirmar ( ' devolución de llamada adjunta activada ' , nodo . _info [ 1 ]. tipo  ===  ' adjunto ' );
        documento . cuerpo . removeChild ( nodo . parentNode );
        setTimeout ( wru . async ( function () {
          wru . afirmar ( ' devolución de llamada desconectada ' , nodo . _info [ 2 ]. tipo  ===  ' desconectado ' );
        }), 20 );
      }), 20 );
    }
  }, {
    nombre :  ' V0: atributos ' ,
    prueba :  función () {
      var args, información;
      var nodo =  documento . createElement ( ' x-direct ' );
      documento . cuerpo . appendChild ( document . createElement ( ' div ' )). appendChild (nodo);
      setTimeout ( wru . async ( function () {
        nodo . setAttribute ( ' what ' , ' ever ' );
        wru . afirmar ( nodo . getAttribute ( ' what ' ) ===  ' ever ' );
        setTimeout ( wru . async ( function () {
          info =  nodo . _info . pop ();
          wru . afirman ( ' attributeChanged se llamaba ' , info . Tipo  ===  ' attributeChanged ' );
          args =  info . argumentos ;
          wru . afirmar ( ' argumentos correctos con nuevo valor ' , args [ 0 ] ===  ' what '  && args [ 1 ] ==  null  && args [ 2 ] ===  ' ever ' );
          nodo . setAttribute ( ' what ' , ' else ' );
          setTimeout ( wru . async ( function () {
            args =  nodo . _info . pop (). argumentos ;
            wru . afirmar ( ' argumentos correctos con valor antiguo ' ,
              args [ 0 ] ===  ' what '  && args [ 1 ] ===  ' ever '  && args [ 2 ] ===  ' else ' );
            nodo . removeAttribute ( ' what ' );
            setTimeout ( wru . async ( function () {
              args =  nodo . _info . pop (). argumentos ;
              wru . afirmar (
                ' argumentos correctos con el atributo eliminado ' ,
                args [ 0 ] ===  ' qué '  &&
                args [ 1 ] ===  ' más '  &&
                args [ 2 ] ==  nulo
              );
              documento . cuerpo . removeChild ( nodo . parentNode );
            }), 20 );
          }), 20 );
        }), 20 );
      }), 20 );
    }
  }, {
    nombre :  ' V0: fuera de línea ' ,
    prueba :  función () {
      var nodo =  documento . createElement ( ' x-direct ' );
      nodo . setAttribute ( ' what ' , ' ever ' );
      setTimeout ( wru . async ( function () {
        wru . afirmar ( ' devolución de llamada creada activada ' , nodo . _info [ 0 ]. tipo  ===  ' creado ' );
        wru . afirmar ( ' se llamó a attributeChanged ' , nodo . _info [ 1 ]. type  ===  ' attributeChanged ' );
        args =  nodo . _info [ 1 ]. argumentos ;
        wru . afirmar ( ' argumentos correctos con nuevo valor ' , args [ 0 ] ===  ' what '  && args [ 1 ] ==  null  && args [ 2 ] ===  ' ever ' );
        nodo . setAttribute ( ' what ' , ' else ' );
        setTimeout ( wru . async ( function () {
          args =  nodo . _info [ 2 ]. argumentos ;
          wru . afirmar ( ' argumentos correctos con valor antiguo ' , args [ 0 ] ===  ' what '  && args [ 1 ] ===  ' ever '  && args [ 2 ] ===  ' else ' );
          nodo . removeAttribute ( ' what ' );
          setTimeout ( wru . async ( function () {
            args =  nodo . _info [ 3 ]. argumentos ;
            wru . afirmar (
              ' argumentos correctos con el atributo eliminado ' ,
              args [ 0 ] ===  ' qué '  &&
              args [ 1 ] ===  ' más '  &&
              args [ 2 ] ==  nulo
            );
          }), 20 );
        }), 20 );
      }), 20 );
    }
  }, {
    nombre :  ' V0: anidado ' ,
    prueba :  función () {
      var
        args,
        parentNode =  documento . createElement ( ' div ' ),
        directo =  parentNode . appendChild (
          documento . createElement ( ' x-direct ' )
        ),
        indirecto =  parentNode . appendChild (
          documento . createElement ( ' div ' , ' x-indirecto ' )
        ),
        indirecto anidado =  directo . appendChild (
          documento . createElement ( ' div ' , ' x-indirecto ' )
        )
      ;
      documento . cuerpo . appendChild (parentNode);
      setTimeout ( wru . async ( function () {
        wru . afirmar ( ' todos los nodos creados ' ,
          directa . _info [ 0 ]. tipo  ===  ' creado '  &&
          indirecta . _info [ 0 ]. tipo  ===  ' creado '  &&
          indirectNested . _info [ 0 ]. tipo  ===  ' creado '
        );
        wru . afirmar ( ' todos los nodos conectados ' ,
          directa . _info [ 1 ]. tipo  ===  ' adjunto '  &&
          indirecta . _info [ 1 ]. tipo  ===  ' adjunto '  &&
          indirectNested . _info [ 1 ]. tipo  ===  ' adjunto '
        );
      }), 20 );
    }
  }, {
    nombre :  ' V0: className ' ,
    prueba :  función () {
      // en línea para className, necesario para IE8
      var args, info, nodo =  documento . cuerpo . appendChild ( document . createElement ( ' x-direct ' ));
      setTimeout ( wru . async ( function () {
        nodo . className  =  ' a ' ;
        wru . afirmar ( nodo . className  ===  ' a ' );
        setTimeout ( wru . async ( function () {
          info =  nodo . _info . pop ();
          wru . afirman ( ' attributeChanged se llamaba ' , info . Tipo  ===  ' attributeChanged ' );
          args =  info . argumentos ;
          wru . afirmar ( ' argumentos correctos con nuevo valor ' , args [ 0 ] ===  ' clase '  && args [ 1 ] ==  nulo  && args [ 2 ] ===  ' a ' );
          nodo . className  + =  ' b ' ;
          setTimeout ( wru . async ( function () {
            info =  nodo . _info . pop ();
            // el único dispositivo conocido que falla esta prueba es Blackberry 7
            wru . afirman ( ' attributeChanged se llamaba ' , info . Tipo  ===  ' attributeChanged ' );
            args =  info . argumentos ;
            wru . afirmar ( ' argumentos correctos con nuevo valor ' , args [ 0 ] ===  ' clase '  && args [ 1 ] ==  ' a '  && args [ 2 ] ===  ' ab ' );
          }), 20 );
        }), 20 );
      }), 20 );
    }
  }, {
    nombre :  ' V0: registrado después ' ,
    prueba :  función () {
      var
        nodo =  documento . cuerpo . appendChild (
          documento . createElement ( ' div ' )
        ),
        xd =  nodo . appendChild ( document . createElement ( ' x-direct ' )),
        laterWeirdoElement =  nodo . appendChild (
          documento . createElement ( ' later-weirdo ' )
        ),
        Más tarde, extraño
      ;
      wru . afirman ( ' _info ni siquiera está presente ' , ! laterWeirdoElement . _info );
      wru . afirmar ( ' x-direct se comportó regularmente ' , xd . _info );
      // ahora está registrado
      LaterWeirdo =  documento . registerElement (
        ' later-weirdo ' ,
        {
          prototipo :  objeto . crear (
            HTMLElement . prototipo , {
            createdCallback : { value :  function () {
              esta . _info  = [{
                tipo :  ' creado ' ,
                argumentos :  argumentos
              }];
            }},
            attachCallback : { value :  function () {
              esta . _info . empujar ({
                tipo :  ' adjunto ' ,
                argumentos :  argumentos
              });
            }},
            detachedCallback : { value :  function () {
              esta . _info . empujar ({
                tipo :  ' separado ' ,
                argumentos :  argumentos
              });
            }},
            attributeChangedCallback : { value :  function (
              nombre ,            // siempre presente
              previousValue ,   // si es nulo, es un nuevo atributo
              valor            // si es nulo, es un atributo eliminado
            ) {
              esta . _info . empujar ({
                tipo :  ' attributeChanged ' ,
                argumentos :  argumentos
              });
            }}
          })
        }
      );
      // más adelante esto debería ser configurado
      setTimeout ( wru . async ( function () {
        wru . afirmar ( ' _info ahora está presente ' , laterWeirdoElement . _info );
        wru . afirmar ( ' _info tiene la información correcta ' ,   laterWeirdoElement . _info . length  ===  2  &&
                                            laterWeirdoElement . _info [ 0 ]. tipo  ===  ' creado '  &&
                                            laterWeirdoElement . _info [ 1 ]. tipo  ===  ' adjunto ' );
        
        wru . afirmar ( ' xd tiene información correcta también ' , xd . _info . length  ===  2  &&
                                            xd . _info [ 0 ]. tipo  ===  ' creado '  &&
                                            xd . _info [ 1 ]. tipo  ===  ' adjunto ' );
      }), 100 );
    }
  }, {
    nombre :  ' V0: constructor ' ,
    prueba :  función () {
      var  XEL , tiempo de ejecución, xEl =  documento . cuerpo . appendChild (
        documento . createElement ( ' x-el-created ' )
      );
      XEL  =  documento . registerElement (
        ' x-el-created ' ,
        {
          prototipo :  objeto . crear (
            HTMLElement . prototipo , {
            createdCallback : { value :  function () {
              tiempo de ejecución =  esto . constructor ;
            }}
          })
        }
      );
      setTimeout ( wru . async ( function () {
        wru . afirmar ( xEl . constructor  === tiempo de ejecución);
        // evitar problemas de IE8
        if ( ! ( ' attachEvent '  en xEl)) {
          wru . afirmar (xEl instancia de  XEL  ||
            // IE9 e IE10 usarán HTMLUnknownElement
            // TODO: presenta pruebas / detección y utiliza dicho prototipo en su lugar
            xEl instanceof  HTMLUnknownElement );
        }
      }), 100 );
    }
  }, {
    nombre :  ' V0: simulando un elemento de tabla ' ,
    prueba :  función () {
      if ( ventana . HTMLTableElement  &&  ' createCaption '  en  HTMLTableElement . prototype ) {
        var HiTable =  documento . registerElement (
          ' hi-table ' ,
          {
            ' extend ' :  ' tabla ' ,
            prototipo :  objeto . crear ( HTMLTableElement . prototype )
          }
        );
        var ht =  documento . createElement ( ' table ' , ' hi-table ' );
        wru . afirmar ( !! ht . createCaption ());
        ht =  nueva  HiTable ;
        wru . afirmar ( !! ht . createCaption ());
      }
    }
  }, {
    nombre :  ' V0: si se registra de una manera, no se puede registrar de otra manera ' ,
    prueba :  función () {
      var falló =  falso ;
      documento . registerElement (
        ' no-doble-comportamiento ' ,
        {}
      );
      prueba {
        documento . registerElement (
          ' no-doble-comportamiento ' ,
          {
            ' extend ' :  ' div '
          }
        );
      } captura (e) {
        fallido =  verdadero ;
      }
      wru . afirmar ( ' no se puede registrar IS después de TAG ' , falló);
      fallido =  falso ;
      documento . registerElement (
        ' nope-double-behaviour ' ,
        {
          ' extend ' :  ' div '
        }
      );
      prueba {
        documento . registerElement (
          ' nope-double-behaviour ' ,
          {}
        );
      } captura (e) {
        fallido =  verdadero ;
      }
      wru . afirmar ( ' no se puede registrar TAG después de IS ' , falló);
    }
  }, {
    name :  ' V0: is = "type" es una configuración solo para extensiones conocidas ' ,
    prueba :  función () {
      var divTriggered =  false ;
      var spanTriggered =  false ;
      documento . registerElement (
        ' did-trigger ' ,
        {
          ' extend ' :  ' div ' ,
          prototipo :  objeto . crear (
            HTMLDivElement . prototipo , {
            createdCallback : { value :  function () {
              divTriggered =  true ;
            }}
          })
        }
      );
      documento . registerElement (
        ' no se disparó ' ,
        {
          ' extend ' :  ' div ' ,
          prototipo :  objeto . crear (
            HTMLDivElement . prototipo , {
            createdCallback : { value :  function () {
              spanTriggered =  true ;
            }}
          })
        }
      );
      var div =  documento . createElement ( ' div ' , ' did-trigger ' );
      var span =  documento . createElement ( ' span ' , ' didnt-trigger ' );
      setTimeout ( wru . async ( function () {
        wru . afirmar ( ' se activó en div ' , divTriggered);
        wru . afirman ( ' pero no provocó el lapso ' , ! spanTriggered);
      }), 100 );
    }
  }, {
    nombre :  ' V0: CustomElement anidado ' ,
    prueba :  función () {
      var a =  nuevo  XDirect ();
      var b =  nuevo  XDirect ();
      var div =  documento . createElement ( ' div ' );
      documento . cuerpo . appendChild (div);
      b . appendChild (a);
      div . appendChild (b);
      setTimeout ( wru . async ( function () {
        wru . afirmar ( ' había información ' , a . _info . length  &&  b . _info . length );
        a . _info  = [];
        b . _info  = [];
        a . setAttribute ( ' what ' , ' ever ' );
        setTimeout ( wru . async ( function () {
          wru . afirmar ( ' attributeChanged activado en un ' ,
            a . _info [ 0 ]. tipo  ===  ' attributeChanged '
          );
          wru . afirman ( ' pero no disparar en b ' , ! b . _info . de longitud );
        }), 100 );
      }), 100 );
    }
  }, {
    nombre :  ' V0: no se puede extender un elemento registrado ' ,
    prueba :  función () {
      var ok =  falso , ABC1  =  documento . registerElement ( ' abc-1 ' , {
        prototipo :  objeto . crear ( HTMLElement . prototipo )
      });
      prueba {
        documento . registerElement ( ' abc-2 ' , {
          ' extend ' :  ' abc-1 ' ,
          prototipo :  objeto . crear ( prototipo ABC1 . )
        });
      } captura (e) {
        ok =  verdadero ;
      }
      wru . afirmar ( ' no se puede crear un elemento que extienda uno personalizado ' , ok);
    }
  }, {
    nombre :  ' V0: no invocar si el atributo tiene el mismo valor ' ,
    prueba :  función () {
      var
        info = [],
        ChangingValue =  documento . registerElement ( ' valor cambiante ' , {
          prototipo :  objeto . create ( HTMLElement . prototype , {
            attributeChangedCallback : { value :  function (
              nombre ,            // siempre presente
              previousValue ,   // si es nulo, es un nuevo atributo
              valor            // si es nulo, es un atributo eliminado
            ) {
              info . empujar ( argumentos );
            }}
          })
        }),
        nodo =  documento . cuerpo . appendChild ( nuevo  ChangingValue );
      ;
      nodo . setAttribute ( ' prueba ' , ' valor ' );
      setTimeout ( wru . async ( function () {
        nodo . setAttribute ( ' prueba ' , ' valor ' );
        wru . afirmar ( ' OK ' );
        setTimeout ( wru . async ( function () {
          wru . afirmar ( ' no se llamó dos veces con el mismo valor ' ,
            info . longitud  ===  1  &&
            info [ 0 ] [ 0 ] ===  ' prueba '  &&
            info [ 0 ] [ 1 ] ===  nulo  &&
            info [ 0 ] [ 2 ] ===  ' valor '
          );
        }), 100 );
      }), 100 );
    }
  }, {
    nombre :  ' V0: eliminar más de un CustomElement ' ,
    prueba :  función () {
      var a =  nuevo  XDirect ();
      var b =  nuevo  XDirect ();

      documento . cuerpo . appendChild (a);
      documento . cuerpo . appendChild (b);

      setTimeout ( wru . async ( function () {
        wru . afirmar ( ' había información ' , a . _info . length  &&  b . _info . length );
        a . _info  = [];
        b . _info  = [];

        documento . cuerpo . removeChild (a);
        documento . cuerpo . removeChild (b);

        setTimeout ( wru . async ( function () {
          wru . afirmar ( ' detachedCallback activado en un ' ,
            a . _info [ 0 ]. tipo  ===  ' separado '
          );
          wru . afirmar ( ' detachedCallback activado en b ' ,
            b . _info [ 0 ]. tipo  ===  ' separado '
          );
        }), 100 );
      }), 100 );
    }
  }
]);