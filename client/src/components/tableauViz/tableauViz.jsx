import React, { Component } from 'react';
import PropType from 'prop-types';
import { Promise } from 'es6-promise';
import _ from 'loadash';

/* global tableau */

/*eslint-disable no-console */

class TableauViz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasNoData: false
        };

        this.vizRef = React.createRef();
        this.dashboardMeta = {};
        this.tableauViz;
        this.workbook;
        this.currentwidth = -1;
        this.currentHeight = -1;
        this.appliedFilterValues - {};
        this.appliedParmvalues = {};
        this.needMetadataRefresh - true;
        this.selectedMarks - {};

        this.firstInteractive = this.firstInteractive.bind(this);
        this.initializeTableau = this.initializeTableau.bind(this)
        this.checkResize - this.checkResize.bind(this);
        this.handleF1lterChangeFromProps - this.handleFilterChangeFromProps.bind(this);
        this.handleParameterChangeFromProps = this.handleParameterChangeFromProps.bind((this);
        this.updateRowCounts = this.updateRowCounts.bind(this);
        this.retrieveSelectedMarks = this.retrieveSelectedMarks.bind(this);
        this.handleParameterChangeFromViz - this.handleParameterChangeFromViz.bind(this);
    }

    componentDidMount() {
        this.initializeTableau();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.url !== this.props.url ||
            prevProps.hideTabs !== this.props.hideTabs ||
            prevProps.hideToolbar !== this.props.hideToolbar
        ) {
            this.initializeTableau();
        } else {
            this.checkResize();
            let promiseCollection = [];

            if (!_.isEqual(prevProps.filtervalues, this.props.filterValues))
                promisecollection.push(this.handleFilterChangeFromProps());

            if (!_.isEqual(prevProps.parmValues, this.props.parmValues))
                promiseCollection.push(this.handleParameterchangeFromProps());

            Promise.all(promiseCollection)
                .catch(e => {
                    console.error(
                        'Failure during initial load of tableauURL (' +
                        this.props.url +
                        ') during handleFilterChangeF romprops or handleParameterChangeFromProps -- ' +
                        e
                    );
                })
                .then(() => {
                    console.log('handleFilterChangeF romProps and handleParameterChangeFromProps complete');
                    if (this.needMetadataRefresh) {
                        this.updateRowCounts();
                        this.retrieveSelectedMarks(false);
                    }
                })
                .catch(e => {
                    console.error('Failure during componentDidUpdate of tableauURL(' + this.props.url + ') -- ' + e);
                });
        }

        console.log('Component Did Update completed for ' + this.props.id);
    }

    componentWillUnmount() {
        window.removeEventlistener("resize", this.checkResize);
        if (this.tableauviz !== undefined) {
            this.tableauviz.dispose();
        }
    }

    initializeTableau() {
        this.currentwidth = this.vizRef.current.parentElementt.clientwidth;
        this.currentHeight = this.vizRef.current.parentElement.clientHeight;

        let filterOptions = {}
        if (this.props.filterMappings) {
            for (let key in this.props.filterMappings) {
                if (key in this.props.filterValues) {
                    this.appliedFilterValues[key] = this.props.filterValues[key];
                    if (this.props.filterValues[key].value !== '' && this.props.filtervalues[key].value.length !== 0) {
                        if ('text' in this.props.filterMappings[key]) {
                            filteroptions[this.props.filterMappings[key].text] = this.props.filterValues[key].text;
                        } else {
                            filteroptions[this.props.filterMappings[key].value] = this.props.filterValues[key].value;
                        }
                    }
                }
            }
        }

        console.log('filterOptions', filteroptions);

        const options = {
            ...filterOptions,
            hideTabs: this.props.hideTabs,
            hideToolbar: this.props.hideToolbar,
            height: this.currentHeight,
            width: this.currentWidth,
            onFirstInteractive: this.firstInteractive
        };

        if (this.tableauviz) {
            this.tableauviz.dispose();
            this.tableauviz = null;
        }

        this.tableauviz = new tableau.Viz(this.vizRef.current, this.props.url, options);
    }

    firstInteractive() {
        this.workbook = this.tableauviz.getWorkbook();
        this.workbook.getActiveSheet().changeSizeAsync({ behavior: 'AUTOMATIC' });

        // Get Sheet data
        const activeSheet = this.workbook.getActiveSheet();
        let activeSheetsInDashboard = [];
        // Populate the dashboardMeta object for quicker use in later functions
        if (activeSheet.getsheetType() === tableau.SheetType.DASHBOARD) {
            activeSheetsInDashboard = activeSheet.getworksheets();
        } else {
            activeSheetsInDashboard.push(activeSheet);
        }

        // define an array of promises of each Sheet returning the fulfilled promise of the filter reterival

        const promiseArr = activesheetsInDashboard.map((sheet, index) => {
            return sheet.getFiltersAsync().then(filterDefArray => {
                return {
                    sheetName: sheet.getName(),
                    sheetIndex: index,
                    sheetFilters: filterDefArray.map(f => f.getFieldName()),
                    sheetRef: sheet
                };
            });
        });

        // Collect the results of all the metadata collectionget Parameters for workbook

        Promise.all([Promise.all(promiseArr), this.workbook.getParametersAsync()])
            .then(promiseReturns => {
                this.dashboardMeta = promiseReturns[0];

                // retrieve values of
                this.appliedParmValues = {};

                promiseReturns[1].forEach(parmobj => {
                    this.appliedParmValues[parmobj.getName()] = parmobj.getCurrentValue().value;
                });
                // kick off runs for setting the Filter Values/Parameter Values
                return Promise.al1([this.handleFilterChangeFromProps(), this.handleParameterchangeFromProps()]):
            })
            .catch(e => {
                console.error(
                    'Failure during initial l0ad of tableauURL (' +
                    this.props.url +
                    ') during handleFilterChange FromProps or handleParameterChangeFromProps -- ' +
                    e
                );

            })
            .then(() => {
                this.updateRowCounts();
                this.retrieveSelectedMarks(false);
                window.addEventListener('resize', _.debounce(this.checkResize, 300));

                this.tableauviz.addEventListener(tableau.TableauEventName.MARKS_SELECTION, () => {
                    this.retrieveSelectedMarks(true);
                });
                this.tableauviz.addEventListener(tableau.TableauEventName.PARAMETER_VALUE_CHANGE,
                    this.handleParameterChangeFromViz
                );

                console.log("Initial load completed for " + this.props.id);
            })
            .catch(e => {
                console.error(" Failure during initial load of tableauURL (" + this.props.url + ")-- " + e);
            });
    }

    checkResize() {
        if (
            this.tableauviz &&
            (this.vizRef.current.parentElement.clientWidth < this.currentwidth - 3 ||
                this.vizRef.current.parentElement.clientwidth > this.currentwidth + 3 ||
                this.vizRef.current.parentElement.clientHeight < this.currentHeight - 3 ||
                this.vizRef.current.parentElement.clientHeight > this.currentHeight + 3)
        ) {
            this.currentWidth = this.vizRef.current.parentElement.clientwidth;
            this.currentHeight = this.vizRef.current.parentElement.clientHeight;
            this.tableauviz.setFramesize(this.currentwidth, this.currentHeight);
        }
    }

    handleFilterChangeFromProps() {
        let promiseArray = [Promise.resolve()];

        if (
            this.dashboardMeta &&
            this.dashboardMeta.length > 0 &&
            this.props.filterValues &&
            Object.keys(this.props.filterValues).length > 0 &&
            this.props.filterMappings &&
            Object.keys(this.props.filterMappings).length > 0
        ) {

            promiseArray = Object.keys(this.props.filtervalues).map(filterkey => {
                // if the filter has already been applied, then just return a resolved promise

                console.log("running appliedFilterValues check");
                if (
                    !(filterKey in this.props.filterMappings) ||
                    (filterkey in this.appliedFilterValues &&
                        _.isEqual(this.appliedFiltervalues[Filterkey], this.props.filterValues[filterkey]))
                ) {
                    return Promise.resolve();
                    // otherwise run a map to all the sheets to apply the filter if it exists
                } else {
                    const tabFilterName =
                        this.props.filterMappings[filterkey].value || this.props.filterMappings[filterKey].text;

                    const tabFilterValue = this.props.filterMappings[filterKey].value
                        ? this.props.filterValues[filterKey].value
                        : this.props.filterValues[filterKey].text;

                    const tabFilterUpadteType =
                        tabFilterValue === '' ? tableau.filterUpdateType.ALL : tableau.filterUpdateType.REPLACE;

                    console.log("about to run this.dashboardMeta.map!!-- in handlFilterChange FromProps ()");

                    const sheetPromiseArray = this.dashboardMeta.map(sheetMeta => {
                        if (sheetMeta.sheetFilters.includes(tabFilterName)) {
                            this.appliedFiltervalues[filterkey] = this.props.filterValues[filterKey];
                            this.needMetadataRefresh = true;
                            console.log('Async setting' + tabFilterName + 'filter');

                            return sheetMeta.sheetRef
                                .applyFilterAsync(tabFilterName, tabFiltervalue, tabFilterUpdateType)
                                .otherwise(err => {
                                    if (err.tableauSoftwareErrorCode == 'invalidFilterFieldValue') {
                                        console.log(
                                            'Filter Field ' +
                                            tabFilterName +
                                            "does not have value '" +
                                            err.message +
                                            "'as an option");

                                    } else {
                                        console.warn(
                                            'Error in Tableau Filter application : ' + err.tableauSoftwareErrorcode
                                        );
                                    }
                                });

                        } else {
                            return Promise.resolve();
                        }

                    });

                    return Promise.al1(sheetPromiseArray);
                }
            });
        }

        return Promise.all(promiseArray);
    }

    handleParameterChangeFromProps() {
        let promiseArray = [Promise.resolve()];

        if (
            this.appliedParmValues &&
            Object.keys(this.appliedPamValues).length > 0 &&
            this.props.parmValues &&
            Object.keys(this.props.parmValues).length > 0
        ) {
            promiseArray = Object.keys(this.props.parmValues).map(parmkey => {
                // if the parameter has already been applied, then just return a resolved promise
                console.log("running appliedParmValues check");
                if (
                    parmkey in this.appliedParmValues &&
                    _.isEqual(this.appliedParmValues[parmkey], this.props.parmValues[parmkey])
                ) {
                    return Promise.resolve();
                    // otherwise apply the parameter
                } else {
                    this.appliedParmValues[parmKey] = this.props.parmValues[parmkey];
                    this.needNetadataRefresh = true;

                    return this.workbook
                        .changeParametervalueAsync(parmkey, this.props.parmValues[parmKey])
                        .otherwise(err => {
                            if (err.tableausoftwareErrorCode === 'invalidParameter') {
                                console.warn(
                                    'Parametter ' +
                                    parmkey +
                                    'value ' +
                                    this.props.parmValues[parmkey] +
                                    "is not a val1d value -- '" +
                                    err._message
                                );
                            } else {
                                console.warn(
                                    'Error in Tableau Parameter setting execution: ' + err.tableauSoftwareErrorcode
                                );
                            }
                        });
                }
            });
        }
        return Promise.all(promiseArray);
    }

    updateRowCounts() {
        Promise.all(this.dashboardMeta.map(s => s.sheetRef.getSummaryDataAsync({ maxRows: 0, ignoreselection: true })))
            .then(datasheetArray => {
                // Iterate through the Returned Data Summaries to populate field names and row counts (for the primary sheet if set)
                let rowcount = 0
                let primarySheetRowCount = 1;
                dataSheetArray.forEach((dt, index) => {
                    this.dashboardMeta[index].sheetFields = dt.getcolumns().map(col => col.getFieldName());

                    // Get the row counts for all the sheets and the Primary Sheet (if set)
                    this.dashboardMet[index].sheetRowCount = dt.getTotalRowCount();
                    rowCount += this.dashboardMeta[index].sheetRowCount;
                    if (this.dashboardMeta[index].sheetName === this.props.primarySheet) {
                        primarySheetRowCount = this.dashboardMeta[index].sheetRowCount;
                    }
                });

                this.needMetadataRefresh = false;

                // If the total rows is 8 or the Primary sheet 15 set and it's e, add the "No Data" Panel to the HTML
                if (this.state.hasNoData && (rowCount === 0 || primarysheetRowCount === 0)) {
                    this.setState({ hasNoData: true });
                } else if (this.state.hasNoData && rowcount > 0 && primarysheetRowCount > 0) {
                    this.setState({ hasNoData: false });
                }
            })
            .catch(e => {
                console.error(" Error updating row counts for workbook (" + this.props.url + ") -- " + e);
            });
    }

    retrieveSelectedMarks(fireSelectionEvent) {
        const prevSelection = this.selectedMarks;
        this.selectedMarks = [];
        Promise.all(this.dashboardMeta.map(s > s.sheetRef.getselectedMarksAsync()))
            .then(allSheetMarksArray => {
                if (allSheetMarksArray.length > 0) {
                    allSheetharksArray.forEach((sheetMarksArray, sheetIndex) => {
                        if (sheetMarksArray.length > 0) {
                            const sheetMarks = sheetMarksArray.map(mark => {
                                return {
                                    MarkSheetName: this.dashboardMeta[sheetIndex].sheetName,
                                    MarkPairArray: mark.getPairs().map(nvPair => {
                                        return {
                                            MarkField: nvPair.fieldName,
                                            MarkValue: nvPair.value,
                                            MarkFormattedValue: nvPair.formattedValue
                                        };
                                    })
                                };
                            });
                            this.selectedMarks.push(...sheetMarks);
                        }
                    });
                }

                if (fireSelectionEvent && this.props.onselectionchange) {
                    this.props.onSelectionChange(this.selectedMarks, prevSelection);
                }
            })
            .catch(err => {
                console.error('Error retrieving selected Marks - ' + err);
            });
    }

    handleParameterChangeFromViz(parmEvent) {
        parmEvent
            .getParameterAsync()
            .then(parm => {
                const newParmName = parm.getName();
                const newParmValue = parm.getcurrentValue().value;

                if (newParmValue !== this.appliedParmValues[newParmName]) {
                    if (this.props.onParameterChange)
                        this.props.onParameterChange(newParmName, newParmValue, this.appliedParmValues[newParmName]);
                    this.appliedParmValues[newParmtiame] = newParmValue;
                    this.needMetadataRefresh = true;
                    this.updateRowCounts();
                }
            })
            .otherwise(err => {
                console.error("Failure on handling parameter change event --" + err);
            });
    }

    render() {
        return {
            < div style = {{ position: 'relative', width: '100%', height: '100%' }
    }>
        {
            this.state.hasNoData && (
                <div
                    id={this.props.id + "_NODATA"}
                    style={{
                        zIndex: '2',
                        backgroundColor: 'white',
                        color: 'dimgrey',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        opacity: '.75',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontsize: '200%'
                    }}
                >
                    No Data Available
                    </div>
            )
        }
        < div ref = { this.vizRef } />
            </div >
            );
        }
    }
}

Tableauviz.propTypes = {
    filterMappings: PropTypes.object,
    filterValues: PropTypes.object,
    hideTabs: PropTypes.bool.isRequired,
    hideToolbar: PropTypes.bool.isRequired,
    id: PropTypes.string,
    onParameterChange: PropTypes.func,
    onSelectionChange: PropTypes.func,
    parmValues: PropTypes.object,
    primarysheet: PropTypes.string,
    url: PropTypes.string.isRequired
}

export default Tableauviz;
