import styles from "@/styles/myplants.module.css";

type PlantsProps = {
  onToggleAddPlant: () => void;
};

function PlantsList({ onToggleAddPlant }: PlantsProps) {
  return (
    <>
      <section className={`${styles.myPlants}`}>
        <div className={`${styles.topList}`}>
          <h2>My Plants</h2>
          <button onClick={onToggleAddPlant}>Nieuwe Plant</button>
        </div>
        <div className={`${styles.plantlist}`}>
          <div className={`${styles.plantitem}`}></div>
          <div className={`${styles.plantitem}`}></div>
          <div className={`${styles.plantitem}`}></div>
          <div className={`${styles.plantitem}`}></div>
          <div className={`${styles.plantitem}`}></div>
          <div className={`${styles.plantitem}`}></div>
          <div className={`${styles.plantitem}`}></div>
          <div className={`${styles.plantitem}`}></div>
        </div>
      </section>
    </>
  );
}

export default PlantsList;
