import DataTable from "react-data-table-component"
import axios from "axios"
import { useEffect, useState } from "react"

function Sales() {
    const [wkPending, setWkPending] = useState(true)
    const [mtPending, setMtPending] = useState(true)
    const [ylPending, setYlPending] = useState(true)
    const [weeklySales, setWeeklySales] = useState([])
    const [monthlySales, setMonthlySales] = useState([])
    const [yearlySales, setYearlySales] = useState([])

    useEffect(() => {
        fetchWeeklySales()
        fetchMonthlySales()
        fetchYearlySales()
    }, [])

    const fetchWeeklySales = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/getweeklysales')
            if (response.status === 200) {
                const data = response.data
                setWkPending(false)
                setWeeklySales(data)
            }
        } catch (error) {
            console.error("Error fetching weekly sales:", error)
        }
    }

    const fetchMonthlySales = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/getmonthlysales')
            if (response.status === 200) {
                const data = response.data
                setMtPending(false)
                setMonthlySales(data)
            }
        } catch (error) {
            console.error("Error fetching monthly sales:", error)
        }
    }

    const fetchYearlySales = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/getyearlysales')
            if (response.status === 200) {
                const data = response.data
                setYlPending(false)
                setYearlySales(data)


            }
        } catch (error) {
            console.error("Error fetching yearly sales:", error)
        }
    }

    const weeklyColumns = [
        {
            name: 'Product',
            selector: row => row.product,
            sortable: true,
        },
        {
            name: 'Sales',
            selector: row => row.sales,
            sortable: true,
        },
        {
            name: 'Qty',
            selector: row => row.qty,
            sortable: true,
        },
    ]

    const monthlyColumns = [
        {
            name: 'Product',
            selector: row => row.product,
            sortable: true,
        },
        {
            name: 'Sales',
            selector: row => row.sales,
            sortable: true,
        },
        {
            name: 'Qty',
            selector: row => row.qty,
            sortable: true,
        },
        {
            name: 'Month',
            selector: row => row.month_name,
            sortable: true,
        },
        {
            name: 'Year',
            selector: row => row.year_num,
            sortable: true,
        },
    ]

    const yearlyColumns = [
        {
            name: 'Total Sales',
            selector: row => row.sales,
            sortable: true,
        },
        {
            name: 'Qty',
            selector: row => row.qty,
            sortable: true,
        },
        {
            name: 'Year',
            selector: row => row.year_num,
            sortable: true,
        },
    ]

    const customStyles = {
        header: {
            style: {
                minHeight: '56px',
            },
        },
        headRow: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
            },
        },
        headCells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                },
            },
        },
        cells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                },
            },
        },
    }

    return (
        <div className="w-100 h-auto bg-secondary-subtle d-flex justify-content-start align-items-start flex-column p-5 ">
            <div className="list mb-5 border-3 border-top border-primary w-100">
                <DataTable
                    title="Weekly Sales"
                    columns={weeklyColumns}
                    data={weeklySales}
                    progressPending={wkPending}
                    fixedHeader
                    fixedHeaderScrollHeight="400px"
                    dense
                    subHeader
                    subHeaderAlign="right"
                    highlightOnHover
                    customStyles={customStyles}
                    pagination
                    responsive
                />
            </div>

            <div className="list mb-5 border-3 border-top border-primary w-100">
                <DataTable
                    title="Monthly Sales"
                    columns={monthlyColumns}
                    data={monthlySales}
                    progressPending={mtPending}
                    fixedHeader
                    fixedHeaderScrollHeight="400px"
                    dense
                    subHeader
                    subHeaderAlign="right"
                    highlightOnHover
                    customStyles={customStyles}
                    pagination
                    responsive
                />
            </div>


             <div className="list mb-5 border-3 border-top border-primary w-100">
                <DataTable
                    title="Yearly Sales"
                    columns={yearlyColumns}
                    data={yearlySales}
                    progressPending={ylPending}
                    fixedHeader
                    fixedHeaderScrollHeight="400px"
                    dense
                    subHeader
                    subHeaderAlign="right"
                    highlightOnHover
                    customStyles={customStyles}
                    pagination
                    responsive
                />
            </div>
           
        </div>
    )
}

export default Sales
