import React from "react";
import config from "../config.json"
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import { StyledTimeline } from "../src/components/Timeline";
import Menu from "../src/components/Menu";




function HomePage() {
    const estilosDePagina = { 
        //backgroundColor: 'red' 
    };

    const [valorDoFiltro, setValorDoFiltro] = React.useState("Angular");

    return (
        <>
            <CSSReset/>
            <div style={estilosDePagina} >
            <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
            <Header banner = {config.banner} />
            <TimeLine searchValue={valorDoFiltro} playlists = {config.playlists}/>
            </div>
        </>    
        )
}

    export default HomePage



const StyledHeader = styled.div`
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 20px;
    }
    .profile-img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

`;

const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({bg}) => bg});
    height: 230px;
`;
function Header(props){

    return (
        <StyledHeader>
            <StyledBanner bg = {config.bg}/>
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`}  className="profile-img"/>
                <div>
                    <h2>
                        {config.author}
                    </h2>
                    <p>
                        {config.job}
                    </p> 
                </div>
            </section>
        </StyledHeader>
    )
}

function TimeLine({searchValue, ...props}){
    
    const playlistNames = Object.keys(props.playlists);

    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video)=>{
                                return video.title.toLowerCase().includes(searchValue.toLowerCase())
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} /> 
                                        <span>
                                            {video.title}
                                        </span>        
                                    </a>
                                )
                            })}
                        </div>
                            
                    </section>
                )
            })
            }
        </StyledTimeline>
    )
}

