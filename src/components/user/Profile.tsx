import React, { useState } from 'react';
import styles from './profile.module.css';

const Profile: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleSave = () => {
    // Логика сохранения данных профиля
    console.log('Сохранение профиля:', { name, email, avatar });
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAvatar(event.target.files[0]);
      setAvatarPreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        {avatarPreview ? (
          <img src={avatarPreview} alt="Avatar Preview" className={styles.profileAvatar} />
        ) : (
          <div className={styles.profileAvatar}>Фото</div>
        )}
        <div className={styles.profileDetails}>
          <h2 className={styles.profileName}>Редактировать профиль</h2>
          <p className={styles.profileEmail}>Ваш email: {email || 'example@mail.com'}</p>
        </div>
      </div>
      
      <form className={styles.profileForm}>
        <input
          className={styles.profileInput}
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={styles.profileInput}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input className={styles.profileInput} type="file" onChange={handleAvatarChange} />
        <button type="button" className={styles.profileButton} onClick={handleSave}>
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};

export default Profile;
