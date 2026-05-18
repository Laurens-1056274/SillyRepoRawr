import { useState } from "react"

const Home  = () => {
    const [name, setName] = useState('SillyCarUmU');
    const [age, setAge] = useState(5)

    const handeClick = () => {
        setName('BoringHuumon');
        setAge(20)
    }
    return ( 
        <div className='home'>
            <h2>Homepage wauw ^w^</h2>
            <p>{name} is {age} years old</p>
            <button onClick={handeClick}>Click me UwU</button>
        </div>
     );
}
export default Home;