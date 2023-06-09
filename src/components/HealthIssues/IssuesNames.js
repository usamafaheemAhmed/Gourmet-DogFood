import { useEffect, useState } from "react";
import styles from "../../components/Breed/styles.module.css";



const IssuesNames = ({
  options,
  onSearch,
  onSelect,
  optionKey = "label",
  optionCount = 5,
  noOptionText = "No Items",
  onSubmit,
}) => {
  const [searchText, setSearchText] = useState("");
  const [selected, setSelected] = useState("");
  const [allOption, setAllOption] = useState(options || []);

   let myBreed=selected;
  //  myBreed=document.getElementById("BreedInput").value;
   localStorage.setItem("Health", myBreed);
  

  useEffect(() => {
    setAllOption(options);
  }, [options]);

  const selectHandle = (val) => {
    let e = val;
    localStorage.setItem("SelectedDisease",e.name);
    onSubmit(e.name);
    console.log(document.getElementById("BreedInput").disable);
    document.getElementById("BreedInput").disabled = true;
    setSearchText("");
    setSelected(val[optionKey]);
    if (onSelect) {
      onSelect(val);
      return;
    }
  };

  const handleChange = ({ target }) => {
    setSearchText(target.value);
    if (onSearch) {
      onSearch(target.value, (data) => setAllOption(data));
      return;
    }

    let tempOptions = [...options];
    tempOptions = tempOptions.filter((obj) =>
      obj[optionKey]?.toLowerCase().includes(target.value?.toLowerCase())
    );
    setAllOption(tempOptions);
   
  };
  function BreedChecked(){
  localStorage.setItem("Breed","dont know this breed");
    
    let B = document.getElementById("breadDropDown").classList;

    let A = document.getElementById("BreedInput").classList;
    if(A.contains("d-none") && B.contains("d-none")){
      A.remove("d-none");
      B.remove("d-none");
    }
    else{
      A.add("d-none");
      B.add("d-none");

    }
  }
 

  return (
    <div className={styles.IssuesNames}>
       {/* Checkbox */}
       <div className="row mt-3">
       
       <div className="col-md-12 text-center">
       <div className="Shpac mb-2">
          <input type="checkbox" id="BreedCheckBox" onClick={BreedChecked}  />
          <label id="BreedBoxText">I don't know health issues.</label>
        </div>
         
       </div>
      
     </div>
      <input
      id="BreedInput"
        className={styles.inputBox}
        onFocus={() => {
          setSelected("");
        }}
        value={selected || searchText}
        onChange={handleChange}
        style={{
          borderBottomLeftRadius: searchText ? 0 : "",
          borderBottomRightRadius: searchText ? 0 : ""
        }}
      />
      
      <div
      id="breadDropDown"
        className={styles.dropdown}
        style={{
          display: searchText ? "flex" : "none",
          // oneOption Height * count - 1st borderTop (1px)
          maxHeight: `${35 * optionCount - 1}px`
        }}
      >
        {!allOption.length ? (
          <div> {noOptionText} </div>
        ) : (
          allOption.map((option, index) => (
            <div key={`${index}`} onClick={() => selectHandle(option)}>
              {option[optionKey]}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default IssuesNames;
