import React, { useEffect, useState } from 'react'; 
import { TabView, TabPanel } from 'primereact/tabview';
// import CreditCardDisplay from './CreditCardDisplay';
import NoCardMessage from './NoCardMessage';
import CreditCardDisplay from './CreditCardDisplay';
import MoneyFlowChart from './MoneyFlowChart';
import TransactionsHistory from './TransactionsHistory';
import Footer from '../LandingPage/Footer';


export default function DashboardHero() {
  const userDetails = JSON.parse(localStorage.getItem("customer"));
  const userId = userDetails?.id;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  
  const [cardData, setCardData] = useState({ hasCard: false, card: null });
  
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const res = await fetch(`${baseUrl}/user/${userId}/cards`);
        const data = await res.json();
        if (data.status === "Success" && data.cards?.length > 0) {
          setCardData({ hasCard: true, card: data.cards });
        } else {
          setCardData({ hasCard: false });
        }
      } catch (err) {
        console.error("Error fetching card data:", err);
        setCardData({ hasCard: false });
      }
    };
  
    if (userId) fetchCardData();
  }, [userId]);
  


    // if (loading) return <p>Loading...</p>;
    return (
      <section>
        <div className="card containerFit">
          <TabView>
            <TabPanel
              header="Overview"
              className="italic focus-within:not-italic"
            >
              <div className="">
                {/* Cards or Account Creation  */}
                <div className="p-6 border-b-[1.6px] border-gray-400">
                  {cardData.hasCard ? <CreditCardDisplay /> 
                  : <NoCardMessage />}
                  {/* <NoCardMessage /> */}
                  {/* <CreditCardDisplay /> */}
                </div>

                {/* Monthly Flow */}
                <div className="flex flex-col md:flex-col lg:flex-row mt-3 w-full h-[fit-content]">
                  <div className="w-full lg:w-[65%] md:w-full sm:w-full">
                    {/* MONEY FLOW CHART  */}
                    <div>
                      <MoneyFlowChart />
                    </div>
                  </div>
                  <div className="lg:border-r-[1.8px] md:border-b-[1.8px] border-gray-400 w-full lg:w-[5%] md:w-full sm:w-full mt-[45px]"></div>

                  {/* TRANSACTION  */}
                  <div className="w-full lg:w-[30%] md:w-full md:mt-[5px] sm:w-full">
                    <TransactionsHistory />
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel
              header="Transfer"
              className="italic focus-within:not-italic"
              disabled
            >
              <div>
             <transfer />
              </div>
            </TabPanel>
            <TabPanel
              header="Transfer"
              className="italic focus-within:not-italic"
              disabled
            >
              <p className="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
              </p>
            </TabPanel>
            <TabPanel
              header="Manage Account"
              className="italic focus-within:not-italic"
              disabled
            >
              <p className="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
              </p>
            </TabPanel>
          </TabView>
          {/* FOOTER */}
          <div className="">
            <Footer />
          </div>
        </div>

        <style>
          {`
                .p-tabview .p-tabview-nav {
                    background: transparent;
                    border: 1px solid #dee2e6;
                    border-width: 0 0 2px 0;
                    }
                    .p-tabview .p-tabview-nav li .p-tabview-nav-link {
                    background: transparent;
                    }
                    .p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link { border-color: #d32f2f;color: #ffffff;
                    }
                    .containerFit{
                    height: fit-content;
                    width: 100%;
                    }
                    .p-component, .p-component * {
                    box-sizing: content-box;
}
                    .p-tabview .p-tabview-panels {
    background: white;
    height: fit-content;
    padding: 0;
    color: #495057;
    border-radius: 20px;
    margin-top: 20px;
}
                    `}
        </style>
      </section>
    );
}


