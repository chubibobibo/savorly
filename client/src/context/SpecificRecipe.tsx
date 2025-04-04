import { useEffect } from "react";
import axios from "axios";
import {toast} from 'react-toastify'

type ChildrenProps = {
  children: React.ReactNode;
};

function SpecificRecipe({ children }: ChildrenProps) {
useEffect(() => {
    const getRecipe = async() => {
        try {
            const foundRecipe = await axios.get('/api/recipe/recipe/:id')
        } catch (err) {
            console.log(err)
        }
    }, getRecipe()
},[])
  return <>{children}</>;
}
export default SpecificRecipe;
