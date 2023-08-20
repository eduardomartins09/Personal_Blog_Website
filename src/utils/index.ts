export const navigationPlacesLinks = [
    {
        link: "/category/information",
        name: "NEWS"
    },
    {
        link: "/category/sport",
        name: "SPORT"
    },
    {
        link: "/category/health",
        name: "HEALTH"
    },
    {
        link: "/category/culture",
        name: "CULTURE"
    },
    {
        link: "/category/nacional",
        name: "NACIONAL"
    },
    {
        link: "/category/internacional",
        name: "INTERNACIONAL"
    },
    {
        link: "/",
        name: "MORE"
    },
]

export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search)

    searchParams.set(type, value)
   
    const newPathname = `${window.location.pathname}?${searchParams.toString()}` 

    return newPathname
}

export const formartDateHome = (data: string | undefined) => { 
    let day = data?.slice(8, 10)
    let month = data?.slice(5, 7)
    let year = data?.slice(0, 4)

    let fullDate = day + "/" + month + "/" + year
    return fullDate
}

export const formartDateDetails = (data: string | undefined) => { 
    let day = data?.slice(8, 10)
    let month = getMonthNumber(data?.slice(4, 7)) 
    let year = data?.slice(11, 15)

    let fullDate = day + "/" + month + "/" + year
    return fullDate
}

const getMonthNumber = (monthName: string | undefined): string | null => {
    const months: { [key: string]: string } = {
        'jan': '01',
        'feb': '02',
        'mar': '03',
        'apr': '04',
        'may': '05',
        'jun': '06',
        'jul': '07',
        'aug': '08',
        'sep': '09',
        'oct': '10',
        'nov': '11',
        'dec': '12',
    }

    const lowerMonthName = monthName?.toLowerCase()
    return lowerMonthName ? months[lowerMonthName] || null : null
}
