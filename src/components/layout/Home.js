import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import Logo from '../../images/logo(1).png'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import AuthContext from '../../context/autenticacion/AuthContext'
import Imagen from '../../images/imagen1.png'
import CartContext from '../../context/cart/CartContext'

export default function Home() {

    const [products, setProducts] = useState([])

    const ctxAuth = useContext(AuthContext)
    const {autenticado} = ctxAuth

    useEffect(() => {
        const getProducts = async () => {
            const info = await axios.get("https://curasana.herokuapp.com/api/productos")
    
            setProducts(info.data.products)
        }
        getProducts()
    }, [])

    const context = useContext(CartContext)
    const {addProducts} = context

    return (
        <>
        <div>
        {autenticado ? <Sidebar /> :
        <Navbar />
        }
        </div>
        <div class="bg-white">
            <div class=" text-center mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
                <div class="space-y-12">
                    
                    <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                        <img class="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56" src={Logo} alt="logo" />
                        <h1 class="text-center text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">CuraSana</h1>
                        <p class="text-xl text-gray-500">"Una marca relajada dedicada a traerte felicidad, bienestar y armonía."</p>  
                    </div>
                    
                    <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Nuestros productos</h2>

                    <ul class="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0">
                    
                            {
                                products.map((e, i) => {
                                    return (
                                        <>
                                        <li key={i} >
                                        <div class="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
                                            <div class="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
                                                <img class="object-cover shadow-lg rounded-lg" src={e.imageURL} alt="" />
                                            </div>
                                            <div class="sm:col-span-2">
                                                <div class="space-y-4">
                                                    <div class="text-lg leading-6 font-medium space-y-1">
                                                        <h3>{e.name} de</h3>
                                                        <p class="text-indigo-600">{e.flavour}</p>
                                                    </div>
                                                    <div class="text-lg">
                                                        <p class="text-gray-500">Presentación: {e.measurement} </p> 
                                                        <p class="text-gray-500">Precio: $ {e.price}</p>
                                                    </div>
                                                    {autenticado ?
                                    
                                                            <button onClick={() => addProducts(e._id)}
                                                                    type="submit" 
                                                                    class="ml-4 inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                                +
                                                            </button>
                                                        : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        </li>
                                        </>
                                     
                                    )
                                })
                            }
                            

                    </ul>

                </div>
            </div>
            <footer class="bg-white">
                <img src={Imagen} class="max-w-5xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8" alt="" />
            </footer>
        </div>
        
        </>
    )
}
