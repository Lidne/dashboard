import React from 'react';

const HomePage = () => {
  return (
    <div>
      <div style={styles.searchContainer}>
        <div style={styles.searchIcon}>
          &#9664;
        </div>
        <input type="text" placeholder="     Поиск по публикациям" style={styles.searchInput} />
        <div style={styles.squareIcon}>
          &#9633;&#9633;&#9633;<br />
          &#9633;&#9633;&#9633;<br />
          &#9633;&#9633;&#9633;
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '10px' }}> 
        <div style={styles.rectangle}>Акции &#9660;</div>
        <div style={styles.rectangle}>Страна &#9660;</div>
        <div style={styles.rectangle}>с 14.02.2006 &#9660;</div>
        <div style={styles.rectangle}>по 14.02.2005 &#9660;</div>
      </div>

      <div style={styles.largeRectangle} className='bg-slate-300'>
        <h2 style={{ textAlign: 'left' }}>Что происходит на фондовом рынке?</h2>
        <img src="https://www.researchgate.net/profile/Goeksel-Karas/publication/352534253/figure/tbl4/AS:1043533674848256@1625809224221/Descriptive-Statistics-by-Country-Groups_Q320.jpg" alt="Stock Market" style={{ maxWidth: '100%', height: 'auto' }} />
        <input type="text" placeholder="Оставьте комментарий" style={{ marginTop: '50px', width: '100%',borderRadius: '5px', }} />
      </div>

      <div style={styles.smallRectangle}>
        <h2>Мысли об акциях</h2>
        <p>Когда и какие бумаги нужно купить, чтобы получить выплаты?</p>
        <input type="text" placeholder="Оставьте комментарий" style={{ marginTop: '70px', width: '100%', borderRadius: '5px' }} />
      </div>
    </div>
  );
};

const styles = {
  rectangle: {
    width: '156px',
    height: '32px',
    borderRadius: '16px',
    border: '1px solid #000',
    textAlign: 'center',
    lineHeight: '32px',
    cursor: 'pointer'
  },
  largeRectangle: {
    width: '574px',
    height: '478px',
    border: '1px solid #000',
    marginTop: '20px',
    borderRadius: '60px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    padding: '20px'
  },
  smallRectangle: {
    width: '574px',
    height: '224px',
    borderRadius: '60px',
    border: '1px solid #000',
    marginTop: '20px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'left',
    padding: '20px'
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '1650px',
    height: '66px',
    borderRadius: '33px',
    border: '1px solid #000',
    margin: '20px auto',
    position: 'relative'
  },
  searchInput: {
    flex: '1',
    height: '100%',
    border: '1px solid #000',
    borderRadius: '33px',
    outline: 'none',
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  searchIcon: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer'
  },
  squareIcon: {
    position: 'absolute',
    right: '25px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    lineHeight: '10px',
    cursor: 'pointer'
  }
};
export default HomePage;
