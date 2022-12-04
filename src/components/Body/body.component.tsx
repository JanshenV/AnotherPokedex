//Libs
import classNames from 'classnames';

//Provider
import useGlobal from 'hooks/useGlobal';

//Styles
import styles from './body.module.scss';

export default function Body({ }) {
  const { mode }: any = useGlobal();

  return (
    <main className={classNames({
      [styles.container]: true,
      [styles['container__modeLight']]: mode === 'light',
      [styles['container__modeDark']]: mode === 'dark',
    })}>
      <section className="filters">
        //TODO Advanced filters
      </section>

      <section className="pokemonGrid">
      //TODO Pokémon Images
      </section>
    </main>
  )
}