import { useState, useEffect, useRef } from "react";
import { axiosInstance } from "@/lib/axios";
import styles from './add-items.module.css';
import { FaPlusCircle } from 'react-icons/fa';
import useClickOutside from "@/hooks/useClickOutside";

const AddItems: React.FC = () => { 
    const [name, setName] = useState<string>("");
    const [variant, setVariant] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [imagevariant, setImageVariant] = useState<File | null>(null);
    const [imagebackground, setImageBackground] = useState<File | null>(null);
    const [notice, setNotice] = useState<string | null>(null);
    const [formVisible, setFormVisible] = useState<boolean>(false); // State untuk mengontrol keterlihatan form
    const formRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('variant', variant);
            formData.append('description', description);
            if (image) {
                formData.append('image', image);
            }
            if (imagevariant) { 
                formData.append('imagevariant', imagevariant);
            }
            if (imagebackground) { 
                formData.append('imagebackground', imagebackground);
            }

            const response = await axiosInstance.post('/api/items', formData);
            console.log(response);

            setNotice("Item berhasil ditambahkan");
            setFormVisible(false); 
        } catch (error) {
            console.log(error);
            setNotice("Gagal menambahkan item");    
        } 
    }


    useClickOutside(formRef, () => setFormVisible(false));

    return (
        <div className={styles.addItem__container}>
            <div className={styles.addItem__content}>
                <div className={styles.addButtonWrapper}>
                    <button className={styles.btn__additem}onClick={() => setFormVisible(!formVisible)}>Tambah Item</button>
                </div>
                {/* Tampilkan form jika formVisible true */}
                {formVisible && (
                    <div className={styles.formContainer}>
                        <div className={styles.formWrapper} ref={formRef}>
                            <div className={styles.header_title}>
                                <h2 className={styles.title}>General Information</h2>
                            </div>
                            {notice && <p>{notice} {name}</p>} 
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <label className={styles.label}>
                                    Name Product
                                    <input className={styles.input__text_name}type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                </label>
                                <label className={styles.label}>
                                    Variant
                                    <input className={styles.input__text}type="text" value={variant} onChange={(e) => setVariant(e.target.value)} />
                                </label>
                                <label className={styles.label}>
                                    Description
                                    <input className={styles.input__text}type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                                </label>
                                <div>
                                    <p>Image Home</p>
                                    <input
                                        className={styles.input__file}
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        required
                                        onChange={(e) => {
                                            const selectedFile = e.target.files ? e.target.files[0] : null;
                                            setImage(selectedFile);
                                        }}
                                    />
                                    <p>Image Item Variant</p>
                                    <input
                                        className={styles.input__file}
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const selectedFile = e.target.files ? e.target.files[0] : null;
                                            setImageVariant(selectedFile);
                                        }}
                                    />
                                    <p>Image Item Variant Background</p>
                                    <input
                                        className={styles.input__file}
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        placeholder="ImageBackground"
                                        required
                                        onChange={(e) => {
                                            const selectedFile = e.target.files ? e.target.files[0] : null;
                                            setImageBackground(selectedFile);
                                        }}
                                    />
                                </div>
                                <button className={styles.button} type="submit">Tambah</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AddItems;
