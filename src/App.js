import { useState} from "react";
import Header from "./components/header";

function App() {
  const [datosPalabra, setDatosPalabra] = useState([])
  const [errorBusqueda, setErrorBusqueda] = useState(false)
  const [stateTheme, setStateTheme] = useState(false)

  const handleButtonClick = () => {
    datosPalabra.map((datos=>{
      return datos.phonetics.map((data)=>{
          if(data.audio === ''){
            return null
          }else{
            const audio = new Audio(data.audio)
            audio.play();
            return null
          }
        })
    }))
  };

  const searchPalabra = async (palabra) =>{
      try{
          const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${palabra}`)
          const [letter] = await data.json()
          setErrorBusqueda(false)
          setDatosPalabra([letter])
      }catch{
          console.error("error");
          setErrorBusqueda(true)
      }
  }
  const changeTheme = () =>{
    setStateTheme(!stateTheme)
  }

  const synonymsWord = datosPalabra.map((datos)=>{
    return(
      <section className="list_synonyms">
        {datos.meanings.map((data)=>(
          <div >
            {data.synonyms.length  > 0 && <div>
              <h1 class="title-synonyms">Synonyms</h1>
              <span className="synonyms">{data.synonyms.join(' ')}</span>
            </div>}
          </div>
        ))}
      </section>
    )
  })

  const dataWord = datosPalabra.map((datos)=>{
    return(
      <div>{datos.meanings.map((data)=>(
        <div>
          <h1 className="title-word">{data.partOfSpeech}</h1>
          <ul className="list-definition">{data.definitions.map((value)=>{
            return <div class="">
              <li>{value.definition}</li>
            </div>
          })}</ul>
        </div>
        ))}</div>
    )
  })

return(
  <div className={`container-app ${stateTheme? 'container-app-dark': ''}`}>
    <Header onSearch={searchPalabra} theme={changeTheme}></Header>
    <main className={`container-data ${stateTheme ? 'container-data-dark': ''}`}>
      {errorBusqueda ? <p className="searchError">Word not found try again</p>:datosPalabra.map((datos)=>{
        return(
          <div class="">
            <section className="keyword">
              <div class="keyword-letter">
                <h1>{datos.word}</h1>
                <h2>{datos.phonetic}</h2>
              </div>
              <button className="audio-button" onClick={handleButtonClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75"><g fill="#A445ED" fill-rule="evenodd"><circle cx="37.5" cy="37.5" r="37.5" opacity=".25"/><path d="M29 27v21l21-10.5z"/></g></svg>
              </button>
            </section>
            {dataWord}
            {synonymsWord}
          </div>
      )})}
   </main>
  </div>
  )
}

export default App;
