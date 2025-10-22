"use client";
import Header from '../../../Components/dashboard/Header'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-1 flex-col ml-0 lg:ml-64">
      <Header
      div={
      <div className="flex items-center gap-4">
      <button className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
        <span className="material-symbols-outlined">menu</span>
      </button>
      <div className="relative">
        <span className="material-symbols-outlined text-gray-600 dark:text-gray-300 cursor-pointer">
          notifications
        </span>
        <span className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
      </div>
      <button className="hidden sm:flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors">
        <span className="material-symbols-outlined mr-2">add</span>
        <span className="truncate">Add New Course</span>
      </button>
    </div>
    }
      />
  <main className="flex-1 p-4 sm:p-6">
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        General Statistics
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex items-start gap-4 rounded-xl p-4 bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700/50">
          <div className="p-2 rounded-lg bg-primary/10">
            <span className="material-symbols-outlined text-primary">book</span>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Total Courses
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              24
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-xl p-4 bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700/50">
          <div className="p-2 rounded-lg bg-green-500/10">
            <span className="material-symbols-outlined text-green-500">
              group
            </span>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Total Students
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              1,452
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-xl p-4 bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700/50">
          <div className="p-2 rounded-lg bg-yellow-500/10">
            <span className="material-symbols-outlined text-yellow-500">
              play_lesson
            </span>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Total Lessons
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              320
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 flex flex-col gap-6">
        <div className="bg-card-light dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700/50 p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              My Courses
            </h3>
            <a
              className="text-sm font-medium text-primary hover:underline"
              href="#"
            >
              View All
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700/50 flex flex-col">
              <div className="flex-grow">
                <div className="w-full aspect-video rounded-md bg-gray-200 dark:bg-gray-700 mb-4">
                  <img
                    alt="The Complete Web Development Bootcamp"
                    className="w-full h-full object-cover rounded-md"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDljTa7-wvnlcw32G1ck7l7hGaLZOOY_JlaknyZQk4KHVIQVHi5n-ZM-pQt56ELcItLEjox0Xl15MFkWy6yS8EzQucaBHc1evHdramzkkbWPl9e5tRWbs6edPoaU6FdMD0REKCI1uBGJey1feCrDfsLjkNiAJSXRpOD5YJsznklHEPiF_4R-DQTI9opeKGRnoUJD4L1W9NwgOulXlN6V7Kar0OKqN2uSp3Mm0vP_HKMrWYI8M35sUYjsdnfvIrfUIqaPi5scYHCyifT"
                  />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  The Complete Web Development Bootcamp
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Published
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center -space-x-2">
                  <img
                    alt="User"
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRPQl2ILydyUe0pNvv_FCZ8x8R-asXI_bLxxVTLxe6yDNZWy81mH6CgKTzwvIUebxvRnR7LWA8YD6eQ2v-LatMNRyVEYMoaRBqbMKUjshjvV2kYWaToVMWW3TO66DmHSz63nBSmreyy-1L8XKWA7InczVEQqqz1wSmcMevufvpsBlUBBgHdUDjUVgn5yVN2K4lbcDzt38Z1NSqG2ZsRNXc69v4ixksPS8dv0296cnSD32PPMJceXlbPLWgL-_u3fUVCeXOz898lrN1"
                  />
                  <img
                    alt="User"
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCljgeGgM1ItMoqCncJhgK51Ce2Xi7ry-QqNcJ9DRPXKtueX96qFSc9YFIG0cyw8fNrlRC70nymsllRVNwz01LJc4sgcxz1gudLegxlyr61Q7GLKRIqTXwTUOu-NrEA31NGWy_fqf14gUa-CK27uniTcSKPI41lm67odOLAICuuq0Z43DUsJGDVhKeAcgy-p4b2GHYDuVqv7-yWYoDjrLwsnkbEsg1l7jaHV2i5EoJo3zVs0Q8rgfCvKC_RjkoFngpUaON_ZwvpUK6A"
                  />
                  <img
                    alt="User"
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiFhRXGgqPFHJwAxp_iwsZ4zmkAinPk_EcyOvRjT9M0ofAj4DxpCJQHrTIRiU3EXoYFyp1C4_0avzGEmATbhELwVcum4asngi2TPvbpwxpFCfJBfubHO3Jbj-Vfr4rfanf-WTkZCT8qL5glZ2RxI6IDOUgvTT8pKbBormD9KgjQYHoeYC0vaGRV9BUl9ZMxM1d4DJzNI-HF9qehNxW6VE1VvY_0Va3cskSeTUpmXk5gYCVVJbsCTzDrVObdStFab77WM10B1J6xyJ3"
                  />
                  <div className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-300">
                    +280
                  </div>
                </div>
                <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span className="material-symbols-outlined text-sm">
                    more_horiz
                  </span>
                </button>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700/50 flex flex-col">
              <div className="flex-grow">
                <div className="w-full aspect-video rounded-md bg-gray-200 dark:bg-gray-700 mb-4">
                  <img
                    alt="UI/UX Design Masterclass"
                    className="w-full h-full object-cover rounded-md"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCO1LgWKIlcen4muFTvNAPM5OU3ST0zk_Tnccu85mXaFSM2PRPznSMQ7Tchp6lYaMGmlg5fVQgNmtQGiQAA09xDFCbSeMZb1a7siAV7hBzF4_ub3esMvUtgtoDvrMpG2TQU0MzEcA97NhLEMyxy_XbVsi-kBhh1oZLmW3pXP5ZH6aUFc83j8NEyR3ttP6qjhnjYfurbSsslSnvqHj4Ibx7u7cUCNYNWfK4leS3J8QFoo0LDC40UpovuCX4-SI2KAO5yb7tRw2tOCb8I"
                  />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  UI/UX Design Masterclass
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Published
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center -space-x-2">
                  <img
                    alt="User"
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVRL2bYsVADY5u3S2eq1ADpmaxh2zvwuX5L7tJs0EzP36-vXtrkTXeHZRNdVd8yMXHd0gQdYkGY2rawKCf8t_oPjAW-c2PGcE3oUdmmOnP-7VcgEX1QfVAO9rHwdwdmVj-4iA6aouYX8J_r-6NTIqAXU2sQ8hS43IkT0cF_PwjC2D_AR4mmDpBj6qPhMC3GywKSXpQ3wA2tOUaW-wYvXq3YwHFFpNEx0nyvsUNQVJYxSYplNsMHq9s-8MU2nHEJf2fmJmQTB8Pz_sz"
                  />
                  <img
                    alt="User"
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_P_51MHyVb7MKiM_JHuxOF7e2t-LeQhI7h-5ze-F9nqDmsm0TV-NL0NJtSO5km8vjkR2Gq-VdOhKU272UlJWPHgcn_jOhm27IgXUuZ9xQtlaWoCReaShgbpapbP2nm0RNblwIrv0PshDnCY09EhjMFC6puLB3TYgUWXMAz6SEDrMTsZpulqCcgpbXS7O9myeKwb4hJLBQVUutK1_RISivLI4RgLjLxxPE9kpPKMm4eF0tuA0VzHvzcfcXDfdAoW8AuQo5sx0CFgcp"
                  />
                  <div className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-300">
                    +150
                  </div>
                </div>
                <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span className="material-symbols-outlined text-sm">
                    more_horiz
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4 sm:hidden">
            <button className="flex items-center justify-center rounded-lg h-10 px-4 w-full bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors">
              <span className="material-symbols-outlined mr-2">add</span>
              <span className="truncate">Add New Course</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="bg-card-light dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700/50 p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Messages
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC63Mm293fv9SOYzk_hAPakuvAcA8MlhcvhzZnH5MlEBHPhbXZJhlKDrqihtWo6_9FttLGquxHGu65YCXHG7pA8eHm1vKxS81xcWIRYtfQ3iXcjMSEcDdv9FDutdXpwrskGaNN7I_l7QttAHL4GiBlcoHJFWlzzfoA0gbLb205v7e6tkU3GaKUyn6rvZXcx70j9yVEkiX0AZG0dxa_qt8LgXhKhVGVZZmIHO0wRm6b7RzHiBPEOitLIUXoWStDfDiue7MuU66JrIGmX')",
                }}
              />
              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">
                    John Smith
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    2h ago
                  </p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Hey! I have a question about the last lesson.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="relative w-10 h-10">
                <div
                  className="w-10 h-10 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC63Mm293fv9SOYzk_hAPakuvAcA8MlhcvhzZnH5MlEBHPhbXZJhlKDrqihtWo6_9FttLGquxHGu65YCXHG7pA8eHm1vKxS81xcWIRYtfQ3iXcjMSEcDdv9FDutdXpwrskGaNN7I_l7QttAHL4GiBlcoHJFWlzzfoA0gbLb205v7e6tkU3GaKUyn6rvZXcx70j9yVEkiX0AZG0dxa_qt8LgXhKhVGVZZmIHO0wRm6b7RzHiBPEOitLIUXoWStDfDiue7MuU66JrIGmX')",
                  }}
                />
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white dark:ring-card-dark" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">
                    Emily Jones
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    1d ago
                  </p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Just wanted to say thanks for the great course!
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC63Mm293fv9SOYzk_hAPakuvAcA8MlhcvhzZnH5MlEBHPhbXZJhlKDrqihtWo6_9FttLGquxHGu65YCXHG7pA8eHm1vKxS81xcWIRYtfQ3iXcjMSEcDdv9FDutdXpwrskGaNN7I_l7QttAHL4GiBlcoHJFWlzzfoA0gbLb205v7e6tkU3GaKUyn6rvZXcx70j9yVEkiX0AZG0dxa_qt8LgXhKhVGVZZmIHO0wRm6b7RzHiBPEOitLIUXoWStDfDiue7MuU66JrIGmX')",
                }}
              />
              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">
                    Michael Brown
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    3d ago
                  </p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  Can you provide the source code for...
                </p>
              </div>
            </li>
          </ul>
          <button className="mt-6 w-full text-center text-sm font-medium text-primary hover:underline">
            View all messages
          </button>
        </div>
      </div>
    </div>
  </main>
</div>
  )
}

export default page