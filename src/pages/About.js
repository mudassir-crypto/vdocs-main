import React from 'react'
import Header from '../components/Header'
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from 'react-responsive-carousel'
import carousel1 from '../images/carousel-1.png'
import carousel2 from '../images/carousel-2.png'
import carousel3 from '../images/carousel-3.png'

function About() {
  return (
    <div>
        <Header/>
        <div className=''>
          <div>
              <Carousel showThumbs={false} showStatus={false} showIndicators={false} interval={500}>
                  <div>
                      <img src={carousel1} alt="" />
                  </div>
                  <div>
                      <img src={carousel2} alt="" />    
                  </div>
                  <div>
                      <img src={carousel3} alt="" />
                  </div>
              </Carousel>

              <div className='bg-amazon_blue text-default max-w-7xl mx-auto mt-5 p-5'>
                <div className='border-b-2 border-default'>
                  <h4 className='text-4xl pb-3'>About Vit</h4>
                </div>

                <div className='flex mt-5 items-center justify-between '>
                    <p>
                    The Vidyalankar group was established in 1960 by Professor C.S. Deshpande. Over decades, Vidyalankar has come to be known for 
                    providing quality education at affordable prices across various educational streams. Vidyalankar’s interest ranges from training 
                    institutes to colleges and subjects range from engineering to management examinations to preparation for studying abroad.
                    </p>
                    <img src="https://vidyalankar.edu.in/wp-content/uploads/2019/03/vidyalankar.png" className='hidden md:flex w-64 h-32 object-contain' alt="" />
                </div>

                <div className='flex-col mt-5 space-y-4'>
                    <div className='flex-col space-y-2'>
                      <h2 className='text-2xl'>Vision</h2>
                      <p className='text-justify'>
                      To be a globally recognized institute where learners are nurtured in a scholarly environment to evolve 
                      into competent professionals and researchers to benefit society.
                      </p>
                    </div>

                    <div className='flex-col space-y-3 text-justify border-b-2 border-default'>
                      <h2 className='text-2xl'>Mission</h2>
                      <p className='text-justify'>
                      Evolve a curriculum which emphasizes on strong fundamentals with the flexibility to choose advanced courses of interest and 
                      gain exposure to tools and techniques in contemporary subjects.
                      </p>
                      <p className='text-justify'>
                      Encourage a teaching-learning process in which highly competent faculty share a symbiotic association with institutes of repute.
                      </p>
                      <p>
                      Facilitate creation and dissemination of knowledge through a digitally-enabled learning environment.
                      </p>
                      <p className='text-justify'>
                      Develop academic and infrastructural facilities with modern equipment and other learning resources and encourage reciprocal 
                      sharing with other institutes through networking.
                      </p>
                      <p className='text-justify pb-3'>
                      Establish a Center of Excellence to enhance academia-industry partnership and work on collaborative projects.
                      </p>
                    </div>

                    <div className='flex flex-col mt-5 space-y-7'>
                    <h4 className='text-4xl'>Departments</h4>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5'>
                      
                        <a href="https://vit.edu.in/computer-engineering.html" target="_blank" rel="noopener noreferrer" className='bg-default p-10 text-white rounded-lg'>
                          <p className='text-center'>Computer Science</p>
                        </a>

                        <a href="https://vit.edu.in/information-technology.html" target="_blank" rel="noopener noreferrer" className='bg-default p-10 text-white rounded-lg'>
                          <p className='text-center'>Information Technology</p>
                        </a>

                        <a href="https://vit.edu.in/electronics-engineering.html" target="_blank" rel="noopener noreferrer" className='bg-default p-10 text-white rounded-lg'>
                          <p className='text-center'>Electronics & Computer Science</p>
                        </a>
                
                        <a href="https://vit.edu.in/electronics-telecommunication-engineering.html" target="_blank" rel="noopener noreferrer" className='bg-default p-10 text-white rounded-lg'>
                          <p className='text-center'>Electronics & Telecommunication</p>
                        </a>
            
                        <a href="https://vit.edu.in/biomedical-engineering.html" target="_blank" rel="noopener noreferrer"  className='bg-default p-10 text-white rounded-lg'>
                          <p className='text-center'>Biomedical</p>
                        </a>
                    
                        <a href="https://vit.edu.in/management.html" target="_blank" rel="noopener noreferrer" className='bg-default p-10 text-white rounded-lg'>
                          <p className='text-center'>Management Studies</p>
                        </a>
                      
                    </div>
                    
                  </div>
                </div>

              </div>
          </div>
        </div>
    </div>
  )
}

export default About