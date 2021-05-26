import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Landing from'./pages/landing';
import KennelsMap from './pages/KennelsMap';
import CreateKennel from './pages/createKennel';
import Kennel from './pages/kennel';

function Routes(){
  return(
    //O exact é geralmente colocado na primeira tela, ele faz a comparação de igualdade, ele só vai chamar a tela landing
    //Se o caminho for exatamente igual, se nçao ele não chama. 
    //O Switch faz com que apareça uma rota por vez em tela. 
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing}/>
        <Route path="/map" component={KennelsMap}/>
        
        <Route path="/kennels/create" component={CreateKennel}/>
        <Route path="kennels/:id" component={Kennel}/>
      </Switch>  
    </BrowserRouter>
  );
}
 export default Routes;