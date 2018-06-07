import React from 'react';
import { bool, node, string } from 'prop-types';
import styles from './Modal.scss';

const Modal = ({ title, isGallery, isSettings, children, id }) => {
  const closeModal = () => {
    const modal = document.getElementById(id);
    modal.style.display = 'none';
  };

  const renderHeader = () => (
    <div className={styles.Header}>
      <button className={styles.ButtonClose} onClick={closeModal}>
        <i className="fa fa-times" />
      </button>
      <p className={styles.Title}>{title}</p>
    </div>
  );

  const renderSettingsHeader = () => (
    <div className={styles.SettingsHeader}>
      <div className={styles.SettingsTitle}>
        <p>Settings</p>
      </div>
      <button className={styles.ButtonClose} onClick={closeModal}>
        <i className="fa fa-times" />
      </button>
    </div>
  );

  const galleryStyles = (
    isGallery
      ? { padding: '30px', borderRadius: '4px', paddingTop: '0' }
      : {}
  );

  const settingsStyles = (
    isSettings
      ? { paddingLeft: '0', width: '75%' }
      : {}
  );

  return (
    <div id={id} className={styles.Modal}>
      <div
        className={styles.CloseOverlay}
        onClick={closeModal}
        onKeyDown={() => {}}
        role="button"
        tabIndex="0"
      />
      <div className={styles.Content} style={{ ...galleryStyles, ...settingsStyles }}>
        {
          isGallery
            ? (
              <div className={styles.GalleryClose}>
                <button onClick={closeModal}><i className="fa fa-times" /></button>
              </div>
            )
            : null
        }
        {title ? renderHeader() : null}
        {isSettings ? renderSettingsHeader() : null}
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: node.isRequired,
  id: string.isRequired,
  title: string,
  isGallery: bool,
  isSettings: bool,
};

Modal.defaultProps = {
  title: '',
  isGallery: false,
  isSettings: false,
};

export default Modal;
