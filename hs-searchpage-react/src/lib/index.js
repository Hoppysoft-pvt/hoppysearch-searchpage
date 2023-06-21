import {
    TextField,
    Button,
    Box,
    Grid,
    ListItem,
    Divider,
    ListItemAvatar,
    Avatar,
    List,
    Link,
    TablePagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useCallback, useEffect, useState } from 'react';
import { createBrowserHistory } from 'history';

import axios from 'axios';
import ListItemTextWithHighlightedText from './ListItemTextWithHighlightedText';
import ResultNotFound from './ResultNotFound';
import ServerError from './ServerError';

const throwMandatoryAttributeError = (name, value) => {
    if (!value)
        throw new Error(`${name} is a mandatory attribute for HSSearchPage`)
}

const HSSearchPage = ({
    primaryText,
    secondaryText,
    targetURL,
    iconURL,
    apiKey,
    indexId,
    onTypeSearch
}) => {
    // throw error
    throwMandatoryAttributeError("indexId", indexId);
    throwMandatoryAttributeError("apiKey", apiKey);
    throwMandatoryAttributeError("targetURL", targetURL);
    throwMandatoryAttributeError("primaryText", primaryText);

    // createBrowserHistory
    const history = createBrowserHistory();

    // UseState
    const [searchText, setSearchText] = useState('');
    const [searchResultDocuments, setSearchResultDocuments] = useState([]);
    const [isSearchServerFailed, setIsSearchServerFailed] = useState(false);
    const [searchPageController, setSearchPageController] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [totalSearchHitCount, setTotalSearchHitCount] = useState(0);

    // function
    const handlePageChange = (event, newPage) => {
        setSearchPageController({
            ...searchPageController,
            pageIndex: newPage
        });
    };

    const handleChangePageSize = (event) => {
        setSearchPageController({
            ...searchPageController,
            pageSize: parseInt(event.target.value, 10),
            pageIndex: 0
        });
    };

    function debounce(callback, timeout) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback.apply(this, args);
            }, timeout);
        };
    }

    const handleSearchJsonData = (searchText) => {
        const simpleSearchEndpoint = searchText
            ? `https://${indexId}.hoppysearch.com/v1/search?q=${searchText}&pageIndex=${searchPageController.pageIndex}&pageSize=${searchPageController.pageSize}`
            : `https://${indexId}.hoppysearch.com/v1/search?pageIndex=${searchPageController.pageIndex}&pageSize=${searchPageController.pageSize}`;

        axios.get(simpleSearchEndpoint, {
            headers: {
                'Authorization': apiKey
            }
        }
        ).then((response) => {
            history.push(`/search?q=${searchText}`);
            if (response?.data?.documents) {
                setSearchResultDocuments(response?.data?.documents)
            } else {
                setSearchResultDocuments([])
            }
            if (response?.data?.totalHits?.value) {
                setTotalSearchHitCount(response?.data?.totalHits?.value)
            }
        }).catch((err) => {
            console.log(err)
            setIsSearchServerFailed(true)
        })
    }

    // useCallback
    const handleSearchJsonDataOnType = useCallback(
        debounce((searchText) => handleSearchJsonData(searchText), 500),
        []
    );

    // useEffect
    useEffect(() => {
        handleSearchJsonData(searchText);
    }, [searchPageController])

    return (
        <Box display="flex" flexDirection="row" justifyContent="center" >
            <Grid
                container
                spacing={1}
                sx={{
                    backgroundColor: "#ffffff",
                    width: "80vw"
                }}
            >
                <Grid item xs={12} md={11}>
                    {onTypeSearch ?
                        <TextField
                            id="outlined-full-width"
                            label="Search"
                            placeholder="Search"
                            fullWidth
                            margin="normal"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            InputLabelProps={{
                                shrink: true
                            }}
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    handleSearchJsonData(event.target.value);
                                }
                            }}
                            onKeyUp={(event) => handleSearchJsonDataOnType(event.target.value)}
                        /> :
                        <TextField
                            id="outlined-full-width"
                            label="Search"
                            placeholder="Search"
                            fullWidth
                            margin="normal"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            InputLabelProps={{
                                shrink: true
                            }}
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    handleSearchJsonData(event.target.value);
                                }
                            }}
                        />
                    }
                </Grid>
                <Grid item xs={12} md={1}>
                    <Button
                        variant="outlined"
                        style={{
                            color: '#673ab7',
                            height: 55,
                            width: 80,
                            borderColor:
                                '#673ab7',
                            marginTop: 17
                        }}
                        onClick={() => handleSearchJsonData(searchText)}
                    >
                        <SearchIcon />
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {isSearchServerFailed ? <ServerError /> :
                        <List sx={{ width: '100%' }}>
                            {(searchResultDocuments.length) === 0 && <ResultNotFound searchText={searchText} />}
                            {
                                searchResultDocuments.map((document, index) => <React.Fragment key={index}>
                                    <ListItem
                                        button
                                        component={Link}
                                        href={document?.[targetURL]}
                                        sx={{
                                            '&:hover': {
                                                border: '2px solid #2196f3',
                                                borderRadius: '4px',
                                                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                                                backgroundColor: '#e3f2fd',
                                                cursor: 'pointer'
                                            },
                                        }}
                                    >
                                        {iconURL && <ListItemAvatar>
                                            <Avatar alt={document?.[primaryText]} src={document?.[iconURL]} />
                                        </ListItemAvatar>}
                                        <ListItemTextWithHighlightedText
                                            primary={document?.[primaryText]}
                                            secondary={secondaryText ? document?.[secondaryText] : ""}
                                            highlightedWords={searchText.toLowerCase().split(" ")}
                                        />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>)
                            }
                        </List>}
                    {
                        ((searchResultDocuments.length !== 0) && !isSearchServerFailed)
                        && <TablePagination
                            component="div"
                            onPageChange={handlePageChange}
                            page={searchPageController.pageIndex}
                            count={totalSearchHitCount}
                            rowsPerPage={searchPageController.pageSize}
                            onRowsPerPageChange={handleChangePageSize}
                        />}
                </Grid>
            </Grid>
        </Box>
    );
}

export default HSSearchPage;

