import HSSearchPage from "hs-search-page";
// import HSSearchPage from "./lib";

function App() {
    return (
        <>
            <HSSearchPage
                indexId={"jq0c0b"}
                apiKey={"hs_2d1vkth26fpt4ngw"}
                iconURL={"image"}
                targetURL={"url"}
                primaryText={"title"}
                secondaryText={"description"}
                onTypeSearch={true}
            />
        </>
    );
}

export default App;
