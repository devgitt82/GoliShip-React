import { useEffect, useState } from 'react';
import CrewModel from '../../Models/CrewModel';
import { Pagination } from '../utils/Pagination';
import { SpinnerLoading } from '../utils/SpinnerLoading';
import { SearchCrew } from './components/SearchCrew';
import { Link} from 'react-router-dom';

export const SearchCrewPage = () => {

    const [crewMembers, setCrewMembers] = useState<CrewModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [crewPerPage] = useState(5);
    const [totalAmountOfCrew, setTotalAmountOfCrew] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [departamentSelection, setDepartamentSelection] = useState('Department');


    useEffect(() => {
        const fetchCrew = async () => {
            const baseUrl: string = "http://localhost:8080/api/crew";

            let url: string = `${baseUrl}?page=${currentPage - 1}&size=${crewPerPage}`;

            if (searchUrl === '') {
                url = `${baseUrl}?page=${currentPage - 1}&size=${crewPerPage}`;
            } else {
                let searchWithPage = searchUrl.replace('<pageNumber>', `${currentPage - 1}`)  
                url = baseUrl + searchWithPage;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.crew;

            setTotalAmountOfCrew(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            const loadedCrewMembers: CrewModel[] = [];

            for (const key in responseData) {
                loadedCrewMembers.push({
                    id: responseData[key].id,
                    rank: responseData[key].rank,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    department: responseData[key].department,
                    img: responseData[key].img,
                });
            }

            setCrewMembers(loadedCrewMembers);
            setIsLoading(false);
        };
        fetchCrew().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [currentPage, searchUrl, crewPerPage]);

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    const searchHandleChange = () => {
        setCurrentPage(1);
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/search/findByNameContainingOrRankContaining?name=${search}&rank=${search}&page=<pageNumber>&size=${crewPerPage}`)
        }
        setDepartamentSelection("Category");
    }

    const departmentField = (value: string) => {
        setCurrentPage(1);
        if (
            value.toLowerCase() === 'deck'||
            value.toLowerCase() === 'e/r'||
            value.toLowerCase() === 'elec'||
            value.toLowerCase() === 'hotel'
        ) {
            setDepartamentSelection(value);
            setSearchUrl(`/search/findByDepartment?department=${value}&page=<pageNumber>&size=${crewPerPage}`)
        } else {
            setDepartamentSelection('All');
            setSearchUrl(`?page=<pageNumber>&size=${crewPerPage}`)
        }
    }

    const indexOfLastCrewMember: number = currentPage * crewPerPage;
    const indexOfFirstCrewMember: number = indexOfLastCrewMember - crewPerPage;
    let lastItem = crewPerPage * currentPage <= totalAmountOfCrew ?
        crewPerPage * currentPage : totalAmountOfCrew;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input className='form-control me-2' type='search'
                                    placeholder='Search' aria-labelledby='Search'
                                    onChange={e => setSearch(e.target.value)} />
                                <button className='btn btn-outline-success'
                                    onClick={() => searchHandleChange()}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                    aria-haspopup="true" aria-expanded="false">
                                    {departamentSelection}
                                </button>
                                <div className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                   
                                        <button type="button" className='dropdown-item' onClick={() => departmentField('All')} >
                                            All
                                        </button>
                                   
                                    <button  type="button" className='dropdown-item' onClick={() => departmentField('Elec')}>
                                            Elec
                                       
                                    </button>
                                    <button type="button" onClick={() => departmentField('E/R')} className='dropdown-item' >
                                            E/R
                                    </button>
                                    <button type="button" onClick={() => departmentField('Deck')} className='dropdown-item' >
                                            Deck
                                    </button>
                                    <button type="button" onClick={() => departmentField('Hotel')} className='dropdown-item' >
                                            Hotel
                                    </button>
                                    
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    {totalAmountOfCrew > 0 ?
                        <>
                            <div className='mt-3'>
                                <h5>Number of results: ({totalAmountOfCrew})</h5>
                            </div>
                            <p>
                                {indexOfFirstCrewMember + 1} to {lastItem} of {totalAmountOfCrew} items:
                            </p>
                            {crewMembers.map(crew => (
                                <SearchCrew crew={crew} key={crew.id} />
                            ))}
                        </>
                        :
                        <div className='m-5'>
                            <h3>
                                Can't find what you are looking for?
                            </h3>
                            <Link type='button' className='btn btn-primary btn-md px-4 me-md-2 fw-bold text-white'
                                to='/home'>Go back to home page</Link>
                        </div>
                    }
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    }
                </div>
            </div>
        </div>
    );
}