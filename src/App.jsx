import { useState } from 'react'
import './App.css'
import { Card } from './component/Card';
import { Home } from './component/Home';

function App() {

  const [name,setName] = useState("");
  const [desc,setDesc] = useState("");
  const [buttonAdd, setButtonAdd] = useState('Add ToDo');
  const [editingCardId, setEditingCardId] = useState(null);
  const [cardDetails, setCardDetails] = useState([]);
  const [filterSelect, setFilterSelect] = useState('All');
  const [open,setOpen] = useState(false);

  const toggleDropdown =() =>{
    setOpen(!open);
  }

  const Add_UpdateToDo =(name, desc)=>{
    if(buttonAdd === 'Add ToDo'){
      let obj ={
        TodoName : name,
        TodoDescription : desc,
        id: Date.now(),
        status: 'Not Completed'
      };

      setCardDetails([...cardDetails,obj]);
    }
    else if(buttonAdd ==="Update ToDO"){
      const updatedCardDetails = cardDetails.map((card)=>
      card.id ===editingCardId ? { ...card, TodoName:name, TodoDescription:desc}:card  
    );
    setCardDetails(updatedCardDetails);
    setButtonAdd('Add ToDo');
    setEditingCardId (null);
    }
    setName('');
    setDesc('');
  };

  let cardUpdate = (name, des, id)=>{
    setButtonAdd('Update ToDo');
    setName(name);
    setDesc(des);
    setEditingCardId(id);
  }

  let cardDelete = (id)=>{
    let delCardDetails = cardDetails.filter((ele)=> ele.id !== id);
    setCardDetails([...delCardDetails]);
  }

  let filterChange = (filSta, id)=>{
  
    const updatedCardDetails = cardDetails.map((card) =>
        card.id === id ? {...card, status: filSta} : card
      );
      setCardDetails(updatedCardDetails);
  }

  const filteredCards = cardDetails.filter((card) => {
    if (filterSelect === 'All') {
      return card;
    } else {
      return card.status === filterSelect;
    }
  });
  
  return (
    <div className='app'>
      <Home />

      {/* Name */}
      <div className='container'>
        <form className='row mt-4 g-4 d-flex justify-content-center'>
            <div className="col-md-6 col-lg-4 d-flex justify-content-center">
              <label htmlFor="ToDoName" className="visually-hidden">ToDo Name</label>
              <input type="text" className="form-control w-100" id="ToDoName" placeholder='ToDo Name'
              value={name} onChange={(e)=>setName(e.target.value)} required/>
            </div>
            <div className="col-md-6 col-lg-4 d-flex justify-content-center">
              <label htmlFor="ToDoDescription" className="visually-hidden">ToDo Description</label>
              <input type="text" className="form-control w-100" id="ToDoDescription" placeholder="ToDo Description"
               value={desc} onChange={(e)=>setDesc(e.target.value)} required/>
            </div>
            <div className="col-md-12 col-lg-3 d-flex justify-content-center">
              <button type="button" disabled={name === "" || desc === ""}  
              className={`btn w-75 ${buttonAdd === 'Add ToDo' ? 'btn-success' : 'btn-primary'}`} onClick={()=> Add_UpdateToDo(name, desc)}>{buttonAdd}</button>
            </div>
        </form>
      </div>
      {/* Bar details */}
      <div className='row mt-5 px-md-5 px-lg-5 d-flex align-items-center'>
        <div className='col-12 col-md-5 col-lg-4 d-flex justify-content-center'><h4 className='h4 m-0'>My Todos</h4></div>
        <div className='col-12 col-md-1 col-lg-3 mb-3'></div>
        <div className='col-12 col-md-6 col-lg-5 d-flex align-items-center justify-content-center'>
          <h5 className='h5 m-0 d-inline'><label htmlFor="dropDown">Status Filter : &nbsp;</label></h5>
          <div className="dropdown d-inline">
            <button className={`btn btn-outline-dark text-white dropdown-toggle ${filterSelect === 'All' ? 'btn-primary' : filterSelect === 'Completed' ?
                'btn-success' : 'btn-danger'} ${open ? 'show': ''} `} type="button" id="dropDown" data-bs-toggle="dropdown"
              aria-expanded={open ? 'true': 'false'} onClick={toggleDropdown}>{filterSelect}&nbsp;</button>
            <ul className={`dropdown-menu ${open ? 'show': ''}`} aria-labelledby="dropDown">
              <li>
                <button className="dropdown-item btn-primary" type="button" onClick={() => setFilterSelect('All')}>
                  All</button>
              </li>
              <li>
                <button className="dropdown-item" type="button" onClick={() => setFilterSelect('Completed')}>
                  Completed</button>
              </li>
              <li>
                <button className="dropdown-item" type="button" onClick={() => setFilterSelect('Not Completed')}>
                  Not Completed</button>
              </li>
            </ul>
            
          </div>
        </div>
      </div>

      {/* Filter card */}
      <div className='row todo-cards-row py-5 d-flex justify-content-center'>
        {
          filteredCards.length === 0 ? <h3 className='h3 text-center mb-4'>ToDo is Empty.</h3> :
            filteredCards.map((card) => {
              return <Card key={card.id} card={card} cardUpdate={cardUpdate} cardDelete={cardDelete}
                filterChange={filterChange} />
            })
        }
      </div>

    </div>
      
  )
}

export default App


