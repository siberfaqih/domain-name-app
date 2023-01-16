import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import "bootstrap/dist/css/bootstrap.min.css";
// import styles from '../styles/Home.module.css'
import {useState} from 'react';
import axios from 'axios'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [keyword, setKeyword] = useState(null);
  const [response, setResponse] = useState(null);
  
  const getDomain = async () => {
		try {
			const res = await axios.get('api/search/', {
				params: {keyword}
			}); 
			const {data} = res;
			setResponse(data); // Store the response

		} catch (error) {
			console.log(error);
		}
	};

  
  return (
    <>
      <Head>
        <title>Domain Name Info App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Muhammad Faqih" />
        <meta name="NIM" content="2020230032 " />
        <meta name="author2" content="RIFQI IQBAL PRATAMA" />
        <meta name="NIM2" content="2020230006" />
        <meta name="author4" content=" AMANDA NUR RAHMAN" />
        <meta name="NIM4" content="2018230142" />
        <meta name="author3" content="Rino Ristanta Surbakti" />
        <meta name="NIM3" content="2018230153" />
      </Head>
      
      <main>
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
          <div>
            <h1>Domain Name App</h1>
          </div>

          <div>
            <form
              onSubmit={e => {
                getDomain();
                e.preventDefault();
                e.stopPropagation();
              }}
              >
              <input 
                placeholder='site.com'
                type="text" 
                className="me-3"
                onChange={e => {
                  setKeyword(e.target.value);
                  setResponse(null);
                }}
              />
              <button type="submit" className="btn btn-primary">Submit</button>
           </form>
          </div>

          {response && (
            <div className="mt-10">
              <h3 className="text-primary text-center mt-5">
                The domain {keyword} is{' '}
                {response.registered === true ? (
                  <span className="text-danger">not available</span>
                ) : (
                  <span className="text-primary">available</span>
                )}
					    </h3>

              {
              response.registered === true && (
                <div>
                <h3>Details:</h3>
                  <table className='border border-dark table text-center'>
                    <tr>
                      <td className='py-2 px-2 border border-dark'>Domain</td>
                      <td className='py-2 px-2 border border-dark'>{keyword}</td>
                    </tr>
                    <tr>
                      <td className='py-2 px-2 border border-dark'>Status</td>
                      <td className='py-2 px-2 border border-dark'>Registered</td>
                    </tr>
                    <tr>
                      <td className='py-2 px-2 border border-dark'>Registrant</td>
                      <td className='py-2 px-2 border border-dark'>{response.registrar.name}</td>
                    </tr>
                    <tr>
                      <td className='py-2 px-2 border border-dark'>Created on</td>
                      <td className='py-2 px-2 border border-dark'>{response.created}</td>
                    </tr>
                    <tr>
                      <td className='py-2 px-2 border border-dark'>Expires</td>
                      <td className='py-2 px-2 border border-dark'>{response.expires}</td>
                    </tr>
                    <tr>
                      <td className='py-2 px-2 border border-dark'>Last Updated</td>
                      <td className='py-2 px-2 border border-dark'>{response.changed}</td>
                    </tr>
                  </table>
                </div>
              )
              }

            </div>
          )} 
          
             
          <div className="mt-5 text-center">
            <p className="text-primary text-xs font-light">
              Made by my group -{" "}
              <a
                target="_blank"
          rel="noreferrer"
                className="hover:text-active"
                href="https://github.com/siberfaqih/"
              >
                See my github
              </a>
            </p>
          </div>
        </div>

       
      </main>

       

    </>
  )
}