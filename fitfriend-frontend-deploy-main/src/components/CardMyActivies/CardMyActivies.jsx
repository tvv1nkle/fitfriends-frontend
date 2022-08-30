import './CardMyActivites.css'



const CardMyActivites = (props) => {
    
    return(
        <div className="card">
            <div className='gird-container'>
                <div className="header-comment">
                    <div className = "button-edit" onClick={()=>props.updateItem(props.id)}>
                        <i class="fas fa-pen"></i>
                        <span>Edit</span>
                    </div>
                    <div className = "button-delete" onClick={()=>props.removeItem(props.id)}>
                        <i class="fas fa-trash-alt"></i>
                        <span>Delete</span>
                    </div>
                    
                </div>
                <div className="left-box">
                    <div className="text-comment">
                    <p>{props.textComment}</p>
                    </div>
                    <div className="footer-cooment">
                        <div className="location">
                            <span><i class="fas fa-map-marker-alt"></i></span>
                            <p>{props.location}</p>
                        </div>
                        <div className="posted-date">
                            <h5>Posted :</h5>
                            <p>{props.date}</p>
                            <p>{props.time}{props.unitTime}</p>

                        </div>
                        
                        
                    </div>
                   
                </div>
                <div className="image-comment">
                    <img src={props.imageComment} />
                    
                </div>
            </div>
        </div>
    )
}
export default CardMyActivites