import HSSearchPage from "./lib";

function App() {
    return (
        <>
            <HSSearchPage
                indexId={"vo84r6"}
                apiKey={"hs_wfgl9gjn0vwej6vw"}
                iconURL={"image"}
                targetURL={"url"}
                primaryText={"title"}
                secondaryText={"description"}
                onTypeSearch={false}
            />
        </>
    );
}

export default App;
