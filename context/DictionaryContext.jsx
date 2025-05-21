'use client';

import { createContext, useContext, useEffect, useState } from 'react';


const DictionaryContext = createContext({
  dictionary: null,
});

export const useDictionary = () => useContext(DictionaryContext);

export const DictionaryProvider = ({ children }) => {
  const [dictionary, setDictionary] = useState(null);

  async function getDictionary() {
    const rowData = {
      keyValues: [
        "TEST",
        "LABEL_COLLABORATORI",
        "SERVIZIO_CLIENTI_TELEFONO",
        "SERVIZIO_CLIENTI_EMAIL",
        "SERVIZIO_CLIENTI_GIORNO_INIZIO",
        "SERVIZIO_CLIENTI_GIORNO_FINE",
        "SERVIZIO_CLIENTI_ORARIO_INIZIO",
        "SERVIZIO_CLIENTI_ORARIO_FINE",
        "APP_AREACLIENTI_VERSIONE",
        "APP_AREACLIENTI_LINK_GOOGLE_STORE",
        "APP_AREACLIENTI_LINK_APPLE_STORE",
        "SERVIZIO_CLIENTI_INDIRIZZO",
        "GOOGLE_MAPS_SEDE_POSITION",
        "APP_AREACLIENTI_VERSIONE_POPUP",
        "APP_AREACLIENTI_VERSIONE_NEW",
        "TEST_ALESSIO",
        "VERSAMENTI_INTESTATARIO",
        "VERSAMENTI_ISTITUTO_BANCARIO",
        "VERSAMENTI_FILIALE",
        "VERSAMENTI_IBAN",
        "VERSAMENTI_CAUSALE",
      ],
      idNazione: 63,
    };

    try {
      const response = await fetch(
        `https://crm.careholding.it/ws/Call/?Cat=Dictionary&met=GetMultipleKeyValues&np=2`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(rowData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const dictionary = await response.json();

      const formattedDictionary = Object.fromEntries(
        dictionary.map((item) => [item.Key, item.Value])
      );
      
      setDictionary(formattedDictionary);
    } catch (error) {
      console.error('❌ Error in getDictionary:', error);
    }
  }

  useEffect(() => {
    getDictionary();
  }, []);

  return (
    <DictionaryContext.Provider value={{ dictionary }}>
      {children}
    </DictionaryContext.Provider>
  );
};
