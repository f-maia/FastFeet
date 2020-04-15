import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Alert } from 'react-native';

import api from '~/services/api';

import formatDate from '~/utils/formatDate';

import CustomBackground from '~/components/CustomBackground';
import Loading from '~/components/Loading';
import Warning from '~/components/Warning';

import {
  Container,
  Header,
  HeaderText,
  ProblemsList,
  ProblemContainer,
  ProblemScroll,
  ProblemHeader,
  ProblemTopic,
  ProblemDate,
  ProblemText,
} from './styles';

export default function ProblemsView({ route }) {
  const { id } = route.params;

  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadProblems() {
      try {
        const response = await api.get(`/delivery/${id}/problems`, {
          params: { page },
        });
        const { data, headers } = response;

        if (JSON.stringify(data).length <= 2) {
          setNotFound(true);
          return;
        }

        const dataFormatted = data.map((problem) => ({
          ...problem,
          createdAt: formatDate(problem.createdAt),
        }));

        setTotalItems(Number(headers['x-total-count']));
        setProblems((problemsList) => {
          return page === 1
            ? [...dataFormatted]
            : [...problemsList, ...dataFormatted];
        });
      } catch (err) {
        Alert.alert(
          'Erro',
          'Ocorreu um erro ao carregar a lista de problemas.'
        );
      }
    }

    if (page === 1 && refreshing === false) {
      setLoading(true);
    }

    setNotFound(false);
    loadProblems();
    setLoading(false);
  }, [id, page, refreshing]);

  function handleEndReached() {
    const totalPages = totalItems / 6;

    if (totalPages > page) {
      setPage(page + 1);
    }
  }

  function handleRefresh() {
    setRefreshing(true);
    setPage(1);
    setRefreshing(false);
  }

  const style = StyleSheet.create({
    shadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
      position: 'relative',
    },
  });

  function renderProblems() {
    if (loading) return <Loading />;
    if (notFound) return <Warning>Nenhum problema encontrado</Warning>;

    return (
      <ProblemsList
        data={problems}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        onEndReachedThreshold={0.2}
        onEndReached={handleEndReached}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ProblemContainer style={style.shadow}>
            <ProblemHeader>
              <ProblemTopic>Problema registrado em:</ProblemTopic>
              <ProblemDate>{item.createdAt}</ProblemDate>
            </ProblemHeader>
            <ProblemScroll>
              <ProblemText>{item.description}</ProblemText>
            </ProblemScroll>
          </ProblemContainer>
        )}
      />
    );
  }

  return (
    <CustomBackground>
      <Container>
        <Header>
          <HeaderText>Encomenda {id}</HeaderText>
        </Header>

        {renderProblems()}
      </Container>
    </CustomBackground>
  );
}

ProblemsView.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
