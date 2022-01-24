import logo from '../TMDbLogo.svg'

const Credits = () => {
    return (
        <div>
            <footer>
                <h4>This product uses the TMDb API but is not endorsed or certified by TMDb.</h4>
                <img src={logo} alt="TMDb Logo" width="300"/>
            </footer>
        </div>
    )
}

export default Credits
