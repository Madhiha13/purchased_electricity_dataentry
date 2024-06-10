import React, { useState } from 'react';
import axios from 'axios'; 
import { whitevariationSvg, FolderSvg, CircleSvg, Cart1, GreenSvg, Co2, PiechartSvg, AddIcon, SearchSvg, UploadSvg, User, Leftarrow, Layer1, Layer2, Layer3 } from "./../../assets";

const DataEntry = () => {
    const [formData, setFormData] = useState({
        year: '',
        month: '',
        facilityCode: '',
        facilityName: '',
    });


    const [rows, setRows] = useState([
        { ElectricityType :'', Consumption:'', siUnits: '', file: null ,fileUrl :''},
        { ElectricityType :'', Consumption:'', siUnits: '', file: null ,fileUrl :''},
    ]);

    const [facilityCodes] = useState(['001', '002', '003', '004', '005']);
    const [facilityNames] = useState(['Mobile Combustion', 'Facility 2', 'Facility 3', 'Facility 4', 'Facility 5']);

    const yearRanges = [
        '2022-2023',
        '2021-2022',
        '2020-2021',
        '2019-2020',
        '2018-2019',
        '2017-2018',
    ];

    const handleFacilityCodeChange = (e) => {
      const code = e.target.value;
      const index = facilityCodes.indexOf(code);
      const facilityName = facilityNames[index];
      setFormData(prevData => ({
          ...prevData,
          facilityCode: code,
          facilityName: facilityName
      }));
  };
  

    // Other event handler functions...
    const handleFacilityNameChange = (e) => {
      const name = e.target.value;
      const index = facilityNames.indexOf(name);
      const facilityCode = facilityCodes[index];
      setFormData(prevData => ({
          ...prevData,
          facilityName: name,
          facilityCode: facilityCode
      }));
  };
  
      const MonthValue=['january','february','march','april','may','june','july','august','september','october','november','december']
      const handleYearChange = (event) => {
        const yearValue = event.target.value;
        setFormData(prevData => ({
            ...prevData,
            year: yearValue
        }));
    };
    
    const handleMonthChange = (event) => {
      const monthValue = event.target.value;
      setFormData(prevData => ({
          ...prevData,
          month: monthValue
      }));
  };
  const rowCount = rows.length;

      
      const handleInputChange = (index, key, value) => {
          const newRows = [...rows];
          newRows[index][key] = value;
          setRows(newRows);
      };
      
      const handleFileChange = (index, file) => {
        const newRows = [...rows];
        newRows[index].file = file;
        newRows[index].fileName = file.name;
        setRows(newRows);
    };
    const handleUpload = async (index) => {
      const rowData = rows[index];
      const data = {
          ...formData,
          ...rowData
      };
  
      try {
          // Upload file if selected
          if (rowData.file) {
              const formData = new FormData();
              formData.append('file', rowData.file);
              formData.append('fileName', rowData.file.name);
  
              // Upload file and get the fileUrl
              const response = await axios.post('http://localhost:5000/upload', formData);
              if (response.status === 200) {
                  const { fileUrl } = response.data;
                  data.fileUrl = fileUrl;
  
                  // Update the fileUrl in rows
                  const updatedRows = [...rows];
                  updatedRows[index].fileUrl = fileUrl;
                  setRows(updatedRows);
  
                  // Submit data entry with fileUrl
                  await axios.post('http://localhost:5000/purchasedelectricity_dataentry', data);
                  console.log('Data entry submitted successfully for row', index);
              }
          } else {
              // Submit data entry without fileUrl
              await axios.post('http://localhost:5000/purchasedelectricity_dataentry', data);
              console.log('Data entry submitted successfully for row', index);
          }
      } catch (error) {
          console.error('Error submitting data entry for row', index, ':', error);
      }
      
  };
  


      const renderDynamicRows = () => {
        return rows.map((rowData, index) => (
            <div className='row-bar' key={index}>
                <div className="data-row">
                    <input type="text" placeholder="Type of electricity" className="mobile-combustion-data-entry-child1-vehicle" value={rowData.ElectricityType} onChange={(e) => handleInputChange(index, 'ElectricityType', e.target.value)} />
                    {/* <input className="mobile-combustion-data-entry-child2-fuel" type="text" placeholder="Source of Emission" value={rowData.Source} onChange={(e) => handleInputChange(index, 'Source', e.target.value)} /> */}
                    <input className="mobile-combustion-data-entry-child3-consumption" type="text" placeholder="Consumption" value={rowData.Consumption} onChange={(e) => handleInputChange(index, 'Consumption', e.target.value)} />
                    {/* <input className="mobile-combustion-data-entry-child4-si" type="text" placeholder="SI Units" value={rowData.siUnits} onChange={(e) => handleInputChange(index, 'siUnits', e.target.value)} /> */}
                    <input className="mobile-combustion-data-entry-child4-si" type="text" placeholder="SI Units" value={rowData.siUnits} onChange={(e) => handleInputChange(index, 'siUnits', e.target.value)} />
                    <div className='mobile-combustion-data-entry-child18-new'>
                        <img className="file-2-1-icon" alt="" src={UploadSvg} />
                        <label htmlFor={`file-upload-input-${index}`} className="file-upload-input" style={{ width: '' }}>
                            Upload File
                        </label>
                        <input id={`file-upload-input-${index}`} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={(e) => handleFileChange(index, e.target.files[0])} onClick={() => handleUpload(index)} />
                        
                    </div>
                </div>
            </div>
        ));
    };

    const addRow = () => {
        setRows([...rows,  { ElectricityType :'', Consumption:'', siUnits: '', fileUrl :''}]);
    };

    return (
        <div className="mobile-combustion-data-entry">
            {/* Form content
            <buton className="mobile-combustion-data-entry-child12" onClick={addRow}>
                <img className="add-6-icon" alt="" src={AddIcon}/>
                <b className="add-data">ADD DATA</b>
            </buton>
        </div> */}
        <form onSubmit={handleUpload}>
      <div className="mobile-combustion-data-entry-child" />
      <img
        className="white-variation-11"
        alt=""
        src={whitevariationSvg}
      />
      <div className="mobile-combustion-data-entry-item" />
      <img className="user-5-11" alt="" src={User}/>
      <img
        className="data-management-1-icon1"
        alt=""
        src={GreenSvg}
      />
      <img
        className="data-management-4-icon1"
        alt=""
        src={PiechartSvg}
      />
      <img
        className="data-management-2-icon1"
        alt=""
        src={CircleSvg}
      />
      <div className="co2-group">
        <img className="co21" alt="" src={Co2} />
      </div>
      <div className="dropdown-box1">
        <div className="">
          <div className="menu-label2">
            <div className="menu-label3">
            <select
                             value={formData.selectedYear}
                             onChange={handleYearChange}
                              className="year-dropdown header1"
                            >
                         <option value="">Reporting Year</option>
                            {yearRanges.map((year) => (
                                 <option key={year} value={year}>
                                       {year}
                         </option>
                        ))}
                        </select>
            </div>
          </div>
         
          
        </div>
      </div>
      <div className="reporting-year2">Reporting Year</div>
      <img
        className="data-management-3-icon1"
        alt=""
        src={FolderSvg}
      />
      <img
        className="left-arrow-in-circular-button-icon1"
        alt=""
        src={Leftarrow}
      />
      <div className="mobile-combustion-data-entry-inner" />
      {/* <div className="mobile-combustion-data-entry-child6" /> */}
      <div className="select-month">SI Units</div>
      <div className="mobile-combustion-data-entry-child6" />
      <div className="">
      <select
                             value={formData.selectedMonth}
                             onChange={handleMonthChange}
                              className="month-dropdown mobile-combustion-data-entry-child6"
                            >
                         <option value="">{`Select Month `}</option>
                            {MonthValue.map((year) => (
                                 <option key={year} value={year}>
                                       {year}
                         </option>
                        ))}
                        </select></div>
      <div className="type-of-electricity2">Type of Electricity</div>
      
      {/* <input className="mobile-combustion-data-entry-child8" type="text" placeholder="    Facility Code"/>
      
      <input className="mobile-combustion-data-entry-child9" type="text" placeholder="    Facility Name"/> */}
      <select className="mobile-combustion-data-entry-child8" value={formData.selectedFacilityCode} onChange={handleFacilityCodeChange}>
          <option value="">Facility Code</option>
          {facilityCodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        <select className="mobile-combustion-data-entry-child9" value={formData.selectedFacilityName} onChange={handleFacilityNameChange}>
          <option value="">Facility Name</option>
          {facilityNames.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      <div className="facility1">{`Facility `}</div>
      <div className="fuel1">Consumption</div>
      {/* <div className="quantity2">Quantity of Gas Emitted</div> */}
      {/* <div className="si-units2">SI Units</div> */}
      <div className="Units">SI Units</div>
      <div className="month1">Month</div>
      <div className="div16">1976</div>
      <div className="mtco21">MTCO2</div>
      <img className="cart-12-icon1" alt="" src={Cart1} />
      <b className="purchased-electricity1">PURCHASED ELECTRICITY</b>
     
      
      {/* <buton className="mobile-combustion-data-entry-child12" onClick={addRow}>
        <b className="add-data">ADD DATA</b>
        <img className="add-6-icon" alt="" src={AddIcon}/>
      </buton> */}

      <img className="vector-icon" alt="" src={Layer1}/>
      <img
        className="mobile-combustion-data-entry-child13"
        alt=""
        src={Layer2}
      />
      <img
        className="mobile-combustion-data-entry-child14"
        alt=""
        src={Layer3}
      />
      <div className="ellipse-div" />
      <div className="mobile-combustion-data-entry-child15" />
      <div className="mobile-combustion-data-entry-child16" />
      <div className="mobile-combustion-data-entry-child17" />
      <b className="view-data">VIEW DATA</b>
      <img className="add-8-icon" alt="" src={SearchSvg} />
      <div className="attachments">Attachments</div>
      <div className={`dynamic-rows-container ${rowCount > 0 ? 'scrollable' : ''}`}>
        <div>
          <div className="dynamic-rows">{renderDynamicRows()}</div>
        </div>
      </div>
      <buton className="mobile-combustion-data-entry-child12" onClick={addRow}>
        <img className="add-6-icon" alt="" src={AddIcon}/>
        <b className="add-data">ADD DATA</b>
      </buton>
    </form>
    </div>
    );
};

export default DataEntry;
