import React from "react";
import { StyledRegisterVideo } from "./styles";


function useForm(props){
    const [values, setValues] = React.useState(props.initialValues);
    return {
        values,
        handleChange: (e) => {
            const value = e.target.value;
            const name = e.target.name
            //console.log(value);
            //[name] = titulo para o titulo
            //[name] = url para a url
            setValues({...values, [name]: value})

        },


        clearForm: () => {
            setValues(props.initialValues)
        },

    }
}

function renderImageUrl(){
    const [imageUrl, setImageUrl] = React.useState("");

    return {
        imageUrl,
        setImageUrl,

        renderImage: (url) => {

            url = url.replace("https://www.youtube.com/watch?v=", "https://img.youtube.com/vi/") + "/hqdefault.jpg";
            
            //url.includes("https://www.youtube.com/watch?v=") ? `https://img.youtube.com/vi/${props.values.url.replace("https://www.youtube.com/watch?v=", "")}/hqdefault.jpg` : null;
            setImageUrl(url);
        }
    }
    return 
}

export default function RegisterVideo(){

    const [isModalOpen, setIsModalOpen] = React.useState(true);
    const formCadastro = useForm({
        initialValues: {titulo: "", url: ""}
    });
    
    const {imageUrl, setImageUrl, renderImage} = renderImageUrl();

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => {
                setIsModalOpen(true);
            }}>
                +
            </button>
            {isModalOpen && (
                <form onSubmit={(e) =>{
                    e.preventDefault()
                    setIsModalOpen(false)
                    formCadastro.clearForm()
                    }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => {
                            setIsModalOpen(false);
                        }}>X</button>
                        <input  
                            placeholder="Título do vídeo" 
                            name="titulo"
                            value={formCadastro.values.titulo} 
                            onChange={formCadastro.handleChange}/>
                        <input  
                            placeholder="URL"
                            name="url" 
                            value={formCadastro.values.url}
                            onChange={formCadastro.handleChange }
                            />
                        <button type="submit">Cadastrar</button>
                        <div className="image-video-register">
                            <img src={imageUrl} alt="thumb do vídeo" className="image-thumb"/>
                            <button 
                            type="button" 
                            onClick={() => {renderImage(formCadastro.values.url)}}>🔃</button>
                        </div>
                    </div>
                </form>
            )}
        </StyledRegisterVideo>
    )
}