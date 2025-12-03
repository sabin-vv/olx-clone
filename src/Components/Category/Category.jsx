import "./Category.css"

export default function Category() {
    const now = new Date()
    const date = now.toDateString()

    return (
        <div className="category-container">
            <div className="all-category">
                <span>ALL CATEGORIES</span>
                <svg width="20px" height="20px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-w4DG7" d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path></svg>
            </div>
            <li>Cars</li>
            <li>Motorcycles</li>
            <li>MobilePhones</li>
            <li>For Sale: House & Apartments</li>
            <li>Scooters</li>
            <li>Commercial & Other Vehicles</li>
            <li>For Rent : House & Apartments</li>
            <div className="seperator"></div>
            <div>{date}</div>
        </div>
    )
};
