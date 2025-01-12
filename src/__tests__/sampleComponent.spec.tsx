import React from 'react';
import {
        render,
        screen,
        waitFor,
        act,
        fireEvent,
} from '@testing-library/react';
// import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import App from '../App';
// import userEvent from '@testing-library/user-event';
// import supabase from '@/utils/supabase';

it('タイトルをレンダリングする', async () => {
        render(
                // <ChakraProvider value={defaultSystem}>
                        <App />
                // </ChakraProvider>
        );
        // 非同期処理が完了するまで待機
        await waitFor(() => {
                expect(screen.getByText('テスト')).toBeInTheDocument();
        });
});