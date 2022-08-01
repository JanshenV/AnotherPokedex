//Components
import Body from "./components/Body";


export default function App() {
  return (
    <>
      <Body />
      <footer className='creditsContainer'>
        <div>
          Made by <a href='https://github.com/JanshenV?tab=repositories'>
            Janshen
          </a>
        </div>

        <div>
          All content is ® Nintendo, Game Freak, and The Pokémon Company
        </div>
      </footer>
    </>
  );
}

