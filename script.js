fetch('./books.json')
    .then(response=>response.json())  
    .then(booksData=>{
        function display(book){
            return `
            <div id='listitems'>
            <p>Title: ${book.title}</p>
            <p>Author: ${book.author}<p>
            <p>Pages: ${book.pages}</p>
            <p>Country: ${book.country}</p>
            <p>Year: ${book.year} </p>
            <p>Category: ${categorize(book)}</p>
            <hr>
            </div>
            `
        }
        function displaybooks(books,containerId){
            const div1=document.getElementById(containerId)
            const disp1=books.map(display).join('')
            div1.innerHTML=disp1;
        }

        //INFORMATION 1-Filter
        const select1=booksData.filter(book=>book.pages>500 && book.pages<700)
        displaybooks(select1,'info1');

        //INFORMATION 2-Set
        const select2=new Set(booksData.map(book=>book.country));

        const obj1={};
        select2.forEach(country=>{
            obj1[country]=booksData.filter(book=>book.country===country);
        })

        const group1=document.getElementById('info2');
        Object.keys(obj1).forEach(country=>{
            const countryBook=obj1[country];
            const countryBookHtml=countryBook.map(display).join('');
            group1.innerHTML+=`<h3>${country}</h3>${countryBookHtml}`;
        })

        //Switch
        function categorize(book){
            let x;
            switch(true){
                case book.year<500:
                    x='Old';
                    break;
                case book.year>=500 && book.year<=1800:
                    x='Recent';
                    break;
                case book.year>1800:
                    x='New'
                    break;
                default:
                    x='None';
            }
            return x;
        }
        
    })
    .catch(error => {
        console.error('Error fetching the JSON data:', error);
    });