"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/appoloClient";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import Layout from "./components/Layout"; // Import the Layout component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Provider store={store}>
          <ApolloProvider client={client}>
            <Layout> 
              {children} 
            </Layout>
          </ApolloProvider>
        </Provider>
      </body>
    </html>
  );
}