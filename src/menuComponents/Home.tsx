const Home: React.FC = ()=>{

    
    
    return (

        <div className="container mt-5 pt-5">        
        <div className= "container p-5  bg-dark text-white rounded" >      
          <h2 className="text-center">Juego del truco </h2>
    
          <div>
            <h4>Como se juega:</h4>
            <ul className="text-left">
              <li>2, 4 o 6 juadores simultaneos</li>
              <li>Se reparte 3 cartas a cada uno</li>
              <li>Comienza juando el juador que se encuentra a la derecha del que reparti&oacute;</li>
              <li>el cumplimiento y control de las demas reglas est&aacute; liberado a los usuarios quienes llevan los puntos</li>          
            </ul>
    
            <h4>Valor de las cartas:</h4>
    
            <div className="row justify-content-center my-2" >
              <div className="col-2"> <img src={require("../assets/MazoNaipes/e1.png")} alt="macho" className="img-fluid"/> </div>
            </div>
            <div className="row justify-content-center my-2" >
              <div className="col-2"> <img src={require("../assets/MazoNaipes/b1.png")} alt="hembra" className="img-fluid"/> </div>
            </div>
            <div className="row justify-content-center my-2" >
              <div className="col-2"> <img src={require("../assets/MazoNaipes/e7.png")} alt="siete espada" className="img-fluid"/> </div>
            </div>
            <div className="row justify-content-center my-2" >
              <div className="col-2"> <img src={require("../assets/MazoNaipes/o7.png")} alt="siete oro" className="img-fluid"/> </div>
            </div>
            <div className="row justify-content-center my-2" >
              <div className="col-2"> <img src={require("../assets/MazoNaipes/e3.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/o3.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/b3.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/c3.png")} alt="los 3" className="img-fluid"/> </div>
            </div>
            <div className="row justify-content-center my-2" >
              <div className="col-2"> <img src={require("../assets/MazoNaipes/e2.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/o2.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/b2.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/c2.png")} alt="los 3" className="img-fluid"/> </div>
            </div>
            <div className="row justify-content-center my-2" >        
              <div className="col-2"> <img src={require("../assets/MazoNaipes/o1.png")} alt="los 3" className="img-fluid"/> </div>          
              <div className="col-2"> <img src={require("../assets/MazoNaipes/c1.png")} alt="los 3" className="img-fluid"/> </div>
            </div>
            <div className="row justify-content-center my-2 flex-nowrap" >
              <div className="col-2"> <img src={require("../assets/MazoNaipes/e12.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/o12.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/b12.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/c12.png")} alt="los 3" className="img-fluid"/> </div>
            </div>
            <div className="row justify-content-center my-2" >
              <div className="col-2"> <img src={require("../assets/MazoNaipes/e11.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/o11.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/b11.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/c11.png")} alt="los 3" className="img-fluid"/> </div>
            </div>
            <div className="row justify-content-center my-2" >
              <div className="col-2"> <img src={require("../assets/MazoNaipes/e10.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/o10.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/b10.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/c10.png")} alt="los 3" className="img-fluid"/> </div>
            </div>
            <div className="row justify-content-center my-2" >          
              <div className="col-2"> <img src={require("../assets/MazoNaipes/b7.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/c7.png")} alt="los 3" className="img-fluid"/> </div>
            </div>
            <div className="row justify-content-center my-2" >
              <div className="col-2"> <img src={require("../assets/MazoNaipes/e6.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/o6.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/b6.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/c6.png")} alt="los 3" className="img-fluid"/> </div>
            </div>
            <div className="row justify-content-center my-2" >
              <div className="col-2"> <img src={require("../assets/MazoNaipes/e5.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/o5.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/b5.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/c5.png")} alt="los 3" className="img-fluid"/> </div>
            </div>
            <div className="row justify-content-center my-2" >
              <div className="col-2"> <img src={require("../assets/MazoNaipes/e4.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/o4.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/b4.png")} alt="los 3" className="img-fluid"/> </div>
              <div className="col-2"> <img src={require("../assets/MazoNaipes/c4.png")} alt="los 3" className="img-fluid"/> </div>
            </div>                
          </div>
        </div>
      </div>
    );

    };

export default Home