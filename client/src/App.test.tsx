import { render, screen } from "@testing-library/react";
import App from "./App";
import viteLogo from '/vite.svg'
// test('true to be truthy',()=>expect(true).toBeTruthy());
describe('App should render',()=>{
    test('should have Vite logo',()=>{
        render(<App/>);
        // const images = screen.getAllByRole('img');
        // expect(images.find(img => img.getAttribute('src') === viteLogo)).toHaveAttribute('src',viteLogo);
        expect(screen.getByRole('img',{name:"Vite logo"})).toHaveAttribute('src',viteLogo);
    })
})