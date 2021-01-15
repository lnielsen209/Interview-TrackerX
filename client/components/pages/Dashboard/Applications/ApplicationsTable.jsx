import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../../routes/useAuth';
import ApplicationsTableAddButton from './ApplicationsTableAddButton';
import ApplicationsTableHeader from './ApplicationsTableHeader';
import ApplicationsTableRows from './ApplicationsTableRows';
import SearchBar from '../SearchBar';
import axios from 'axios';
import styled from 'styled-components';
import {
  StyledFormLabel,
  StyledFormInput,
  StyledFormPWDInput,
  StyledButton,
  StyledFormWrapper,
  StyledH1,
  StyledH3,
  StyledSpinner,
  StyledTable,
  StyledTableWrapper,
  StyledTd,
  StyledTh,
  StyledTr,
} from '../../../common';

const AppTableWrapper = styled(StyledTableWrapper)``;
const AppTable = styled(StyledTable)``;


const ApplicationsTable = () => {
  const [appData, setAppData] = useState([]);
  const [appDataDefault, setAppDataDefault] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [categorySearchInput, setCategorySearchInput] = useState('company');
  const [showModal, setShowModal] = useState({ action: null, id: null }); // none / edit /add
  const [updateState, setUpdateState] = useState(true);

  const auth = useAuth();
  const history = useHistory();

  // get the users data from the DB
  useEffect(() => {
    if (updateState) fetchApplications();
  }, [updateState]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`/user/${auth.user.id}/application`);
      // console.log('res.data.userData ===> ', res.data.userData);
      setAppData(res.data.userData);
      setAppDataDefault(res.data.userData);
      setUpdateState(false);
    } catch (error) {
      if (error.response.status === 401) {
        history.push('/signin');
      }
      console.log(
        'Error in fetchApplications of DashboardTable component:',
        error.response.data.err
      );
    }
  };

  const filterSearchData = (searchInput, categorySearchInput) => {
    const filtered = appDataDefault.filter((application) => {
      return application[categorySearchInput]
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
    setAppData(filtered);
  };

  const updateSearchInput = (searchInput) => {
    filterSearchData(searchInput, categorySearchInput);
    setSearchInput(searchInput);
  };

  const updateCategorySearchInput = (categorySearchInput) => {
    filterSearchData(searchInput, categorySearchInput);
    setCategorySearchInput(categorySearchInput);
  };

  //Delete application from the DB
  const removeApplications = async (id) => {
    try {
      const res = await axios.delete(`/user/${auth.user.id}/application/${id}`);
      setUpdateState(true);
    } catch (error) {
      if (error.response.status === 401) {
        history.push('/signin');
      }
      console.log(
        'Error in removeApplications of DashboardTable component:',
        error.response.data.err
      );
    }
  };

  return (
    <div>
      <SearchBar
        searchInput={searchInput}
        categorySearchInput={categorySearchInput}
        updateSearchInput={updateSearchInput}
        updateCategoryInput={updateCategorySearchInput}
      />
      <AppTableWrapper>
        <AppTable>
          <ApplicationsTableHeader />
          <ApplicationsTableRows
            appData={appData}
            setShowModal={setShowModal}
            removeApplications={removeApplications}
          />
        </AppTable>
        <ApplicationsTableAddButton
          appData={appData}
          showModal={showModal}
          setShowModal={setShowModal}
          setUpdateState={setUpdateState}
        />
      </AppTableWrapper>
    </div>
  );
};

export default ApplicationsTable;
