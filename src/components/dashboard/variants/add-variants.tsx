import { useState, useEffect, useRef } from 'react';
import { axiosInstance } from '@/lib/axios';
import styles from './add-variant.module.css'
import useClickOutside from "@/hooks/useClickOutside";



const AddVariantPage: React.FC = () => {
  const [gameName, setGameName] = useState('');
  const [price, setPrice] = useState('');
  const [point, setPoint] = useState('');
  const [gameNames, setGameNames] = useState<string[] | null>(null);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchGameNames();
  }, []);

  const fetchGameNames = async () => {
    try {
      const response = await axiosInstance.get('/api/items');
      setGameNames(response.data.data.map((item: any) => item.name)); // Ambil hanya nama dari setiap item
    } catch (error) {
      console.error('Error fetching game names:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post('/api/variant', {
        gameName,
        price: parseInt(price),
        point: parseInt(point)
      });

      console.log('Variant added successfully:', response.data);
      setFormVisible(false);
    } catch (error) {
      console.error('Error adding variant:', error);
    }
  };

  useClickOutside(formRef, () => setFormVisible(false));

  return (
    <div className={styles.addVariant__container}>
      <div className={styles.addVariant__content}>
        <div className={styles.btnWrapper}>
          <button className={styles.btn__addvariant}onClick={() => setFormVisible(!formVisible)}>Tambah Variants</button>
        </div>
        {formVisible && (
          <div className={styles.formContainer}>
            <div className={styles.formWrapper} ref={formRef}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Variation</h2>
                <label className={styles.label}>
                  Game Name
                  {gameNames ? (
                    <select className={styles.select} value={gameName} onChange={e => setGameName(e.target.value)}>
                      <option value="">Select a game...</option>
                      {gameNames.map((game, index) => (
                        <option key={index} value={game}>{game.toUpperCase()}</option>
                      ))}
                    </select>
                  ) : (
                    <p>Loading...</p>
                  )}
                </label>
                <label className={styles.label__number}>
                  Price
                  <input className={styles.input__number} type="number" value={price} onChange={e => setPrice(e.target.value)} />
                </label>
                <label className={styles.label__number}>
                  Points
                  <input className={styles.input__number} type="number" value={point} onChange={e => setPoint(e.target.value)} />
                </label>
                <button className={styles.button} type="submit">Add Variant</button>
              </form>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddVariantPage;
