import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext, type Profile, type User } from '../../src/contexts/AuthContext';
import { API } from '../../src/lib/api';
import { createInitialMockDatabase } from '../../src/mocks/data';
import { PreprintDetailPage } from '../../src/pages/preprints/PreprintDetailPage';

describe('PreprintDetailPage rating animation', () => {
  it('keeps the page mounted and shows one impact burst per selected score', () => {
    const db = createInitialMockDatabase();
    const article = db.articles.find(item => item.id === 'art-sediment-1');

    if (!article) {
      throw new Error('Expected mock article art-sediment-1 to exist');
    }

    const readerUser: User = {
      id: 'user-reader',
      email: 'reader@shitjournal.org',
    };

    const readerProfile: Profile = {
      id: 'user-reader',
      display_name: 'KL',
      institution: 'Bowel Systems Lab',
      social_media: '@bukolosier',
      role: 'author',
      author_badge: null,
    };

    const getDetailStub = cy.stub(API.articles, 'getDetail');
    getDetailStub.onFirstCall().resolves({
      article: {
        ...article,
        my_score: null,
        is_favorited: false,
      },
      comments: [],
    });
    getDetailStub.onSecondCall().resolves({
      article: {
        ...article,
        my_score: 5,
        rating_count: (article.rating_count || 0) + 1,
        is_favorited: false,
      },
      comments: [],
    });

    cy.stub(API.maintainance, 'getList').resolves(null);
    cy.stub(API.interactions, 'rate').resolves({ success: true });

    cy.mount(
      <AuthContext.Provider
        value={{
          user: readerUser,
          profile: readerProfile,
          loading: false,
          refreshProfile: async () => {},
          signIn: async () => ({ error: null }),
          signUp: async () => ({ error: null, needsConfirmation: false }),
          signOut: async () => {},
        }}
      >
        <MemoryRouter initialEntries={['/preprints/art-sediment-1']}>
          <Routes>
            <Route path="/preprints/:id" element={<PreprintDetailPage />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    cy.contains('Negative Externalities of Over-Flushing Draft Manuscripts').should('be.visible');

    cy.get('button[title="5 / 5"]').click();

    cy.get('.rating-impact-burst').should('have.length', 5);
    cy.get('img[alt="Loading"]').should('not.exist');
    cy.contains('Your rating: 5/5').should('be.visible');
  });
});
