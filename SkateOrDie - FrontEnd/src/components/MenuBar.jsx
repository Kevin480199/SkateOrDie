
export default function Menubar(){

    return(
        <div>
            <nav>
            <ul className="menu">
                <li>
                <a href="#">Herr</a>
                <ul className="dropdown">
                    <li><a href="#">Kläder</a></li>
                    <li><a href="#">Accessoarer</a></li>
                    <li><a href="#">Skor</a></li>
                </ul>
                </li>
                <li><a href="#">Dam</a>
                <ul className="dropdown">
                    <li><a href="#">Kläder</a></li>
                    <li><a href="#">Accessoarer</a></li>
                    <li><a href="#">Skor</a></li>
                </ul></li>
                <li><a href="#">Barn</a>
                <ul className="dropdown">
                    <li><a href="#">Kläder</a></li>
                    <li><a href="#">Accessoarer</a></li>
                    <li><a href="#">Skor</a></li>
                </ul></li>
            </ul>
            </nav>
        </div>
    )
}