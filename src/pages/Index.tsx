import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);
  
  const [weekTasks, setWeekTasks] = useState([
    { id: 1, title: 'Подготовить презентацию', day: 'ПН', completed: false, category: 'Работа' },
    { id: 2, title: 'Встреча с командой', day: 'ВТ', completed: true, category: 'Работа' },
    { id: 3, title: 'Сдать отчёт', day: 'СР', completed: false, category: 'Работа' },
    { id: 4, title: 'Тренировка', day: 'ЧТ', completed: false, category: 'Здоровье' },
    { id: 5, title: 'Планирование недели', day: 'ПТ', completed: false, category: 'Личное' },
    { id: 6, title: 'Утренняя зарядка', day: 'ПН', completed: false, category: 'Здоровье' },
    { id: 7, title: 'Прочитать 30 страниц', day: 'СР', completed: true, category: 'Обучение' },
  ]);

  const [trackers, setTrackers] = useState([
    { 
      id: 1, 
      name: 'Я победитель!', 
      color: 'bg-blue-500',
      days: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]
    },
    { 
      id: 2, 
      name: 'Утренняя зарядка', 
      color: 'bg-purple-500',
      days: [1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]
    },
    { 
      id: 3, 
      name: 'Пить достаточно воды', 
      color: 'bg-cyan-500',
      days: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]
    },
    { 
      id: 4, 
      name: 'Вовремя ложиться спать', 
      color: 'bg-red-400',
      days: [1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0]
    },
    { 
      id: 5, 
      name: 'Дыхательная практика', 
      color: 'bg-teal-500',
      days: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]
    },
    { 
      id: 6, 
      name: 'Витамины', 
      color: 'bg-yellow-400',
      days: [1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1]
    },
  ]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(selectedDate);
  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  const toggleTask = (id: number) => {
    setWeekTasks(weekTasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const daysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
  const dayNames = {
    'ПН': 'Понедельник',
    'ВТ': 'Вторник',
    'СР': 'Среда',
    'ЧТ': 'Четверг',
    'ПТ': 'Пятница',
    'СБ': 'Суббота',
    'ВС': 'Воскресенье'
  };

  const getWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1) + (weekOffset * 7));
    
    const dates: { [key: string]: Date } = {};
    daysOfWeek.forEach((day, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      dates[day] = date;
    });
    return dates;
  };

  const weekDates = getWeekDates();

  const getWeekRange = () => {
    const firstDay = weekDates['ПН'];
    const lastDay = weekDates['ВС'];
    return `${formatDate(firstDay)} - ${formatDate(lastDay)}`;
  };

  const goToPreviousWeek = () => setWeekOffset(weekOffset - 1);
  const goToNextWeek = () => setWeekOffset(weekOffset + 1);
  const goToCurrentWeek = () => setWeekOffset(0);

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}.${month < 10 ? '0' + month : month}`;
  };

  const getTasksForDay = (day: string) => weekTasks.filter(task => task.day === day);
  const completedWeek = weekTasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center space-y-2 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            ПланЛайф
          </h1>
          <p className="text-muted-foreground text-lg">Твой креативный планировщик дня</p>
        </header>

        <Tabs defaultValue="week" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-14 bg-white/80 backdrop-blur-sm shadow-lg">
            <TabsTrigger value="week" className="flex items-center gap-2">
              <Icon name="Calendar" size={18} />
              <span className="hidden sm:inline">Неделя</span>
            </TabsTrigger>
            <TabsTrigger value="trackers" className="flex items-center gap-2">
              <Icon name="Target" size={18} />
              <span className="hidden sm:inline">Трекеры</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Icon name="CalendarDays" size={18} />
              <span className="hidden sm:inline">Календарь</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <Icon name="TrendingUp" size={18} />
              <span className="hidden sm:inline">Статистика</span>
            </TabsTrigger>
          </TabsList>



          <TabsContent value="week" className="space-y-4 animate-slide-up">
            {!selectedDay && (
              <Card className="border-2 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToPreviousWeek}
                      className="rounded-xl"
                    >
                      <Icon name="ChevronLeft" />
                    </Button>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-display">{getWeekRange()}</span>
                      {weekOffset !== 0 && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={goToCurrentWeek}
                          className="rounded-xl"
                        >
                          Текущая неделя
                        </Button>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToNextWeek}
                      className="rounded-xl"
                    >
                      <Icon name="ChevronRight" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            {selectedDay ? (
              <Card className="border-2 shadow-xl bg-gradient-to-br from-white to-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedDay(null)}
                      className="flex items-center gap-2"
                    >
                      <Icon name="ArrowLeft" size={20} />
                      Назад к неделе
                    </Button>
                    <span className="text-2xl font-display">{dayNames[selectedDay]}</span>
                    <div className="w-24" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {getTasksForDay(selectedDay).map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-white border-2 border-blue-100 hover:border-blue-300 transition-all hover:shadow-md"
                    >
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="h-6 w-6"
                      />
                      <div className="flex-1">
                        <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </p>
                        <Badge variant="outline" className="mt-1">{task.category}</Badge>
                      </div>
                    </div>
                  ))}
                  {getTasksForDay(selectedDay).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Icon name="CalendarOff" size={48} className="mx-auto mb-2 opacity-50" />
                      <p>Нет задач на этот день</p>
                    </div>
                  )}
                  <Button className="w-full mt-4 h-12 text-lg rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    <Icon name="Plus" className="mr-2" />
                    Добавить задачу
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {daysOfWeek.map((day) => {
                  const dayTasks = getTasksForDay(day);
                  const completedTasks = dayTasks.filter(t => t.completed).length;
                  return (
                    <Card
                      key={day}
                      className="border-2 shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-105 bg-gradient-to-br from-white to-blue-50"
                      onClick={() => setSelectedDay(day)}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">{formatDate(weekDates[day])}</div>
                          <div className="text-base font-display">{dayNames[day]}</div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <Badge variant="secondary" className="text-base px-3">
                            {dayTasks.length}
                          </Badge>
                          <Icon name="ListTodo" size={18} className="text-blue-600" />
                        </div>
                        {dayTasks.length > 0 && (
                          <Progress
                            value={(completedTasks / dayTasks.length) * 100}
                            className="h-2"
                          />
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="trackers" className="animate-slide-up">
            <Card className="border-2 shadow-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  {Array.from({ length: 21 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - (20 - i));
                    const day = date.getDate();
                    const dayOfWeek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'][date.getDay()];
                    return (
                      <div key={i} className="text-center flex-1">
                        <div className="font-bold">{day}</div>
                        <div className="uppercase text-[10px]">{dayOfWeek}</div>
                      </div>
                    );
                  })}
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pb-6">
                {trackers.map((tracker) => (
                  <div key={tracker.id} className="flex items-center gap-3">
                    <div className="w-48 text-sm font-medium truncate">
                      {tracker.name}
                    </div>
                    <div className="flex-1 flex items-center gap-1">
                      {tracker.days.map((completed, idx) => (
                        <div
                          key={idx}
                          className={`flex-1 aspect-square rounded-full transition-all cursor-pointer hover:scale-110 ${
                            completed
                              ? `${tracker.color} shadow-lg`
                              : 'bg-gray-700 border-2 border-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Button className="w-full mt-4 h-12 text-lg rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
              <Icon name="Plus" className="mr-2" />
              Добавить привычку
            </Button>
          </TabsContent>

          <TabsContent value="calendar" className="animate-slide-up">
            <Card className="border-2 shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <Button variant="outline" size="icon" className="rounded-xl">
                    <Icon name="ChevronLeft" />
                  </Button>
                  <span className="text-2xl font-display">
                    {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                  </span>
                  <Button variant="outline" size="icon" className="rounded-xl">
                    <Icon name="ChevronRight" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'].map((day) => (
                    <div key={day} className="text-center font-semibold text-sm text-muted-foreground p-2">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: startingDayOfWeek }, (_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const isToday = day === new Date().getDate() && 
                                   selectedDate.getMonth() === new Date().getMonth();
                    return (
                      <button
                        key={day}
                        className={`aspect-square rounded-xl p-2 text-center transition-all hover:scale-105 ${
                          isToday
                            ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold shadow-lg'
                            : 'hover:bg-purple-100 border-2 border-transparent hover:border-purple-300'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-2 shadow-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Icon name="Target" />
                    Выполнено задач
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-bold">{completedWeek}</p>
                  <p className="text-purple-100 mt-2">за всё время</p>
                </CardContent>
              </Card>

              <Card className="border-2 shadow-xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Icon name="Flame" />
                    Серия дней
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-bold">7</p>
                  <p className="text-blue-100 mt-2">дней подряд</p>
                </CardContent>
              </Card>

              <Card className="border-2 shadow-xl bg-gradient-to-br from-orange-600 to-red-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Icon name="Trophy" />
                    Уровень
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-bold">12</p>
                  <p className="text-orange-100 mt-2">продуктивности</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Activity" />
                  Активность по категориям
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Работа', value: 75, color: 'bg-purple-500' },
                  { name: 'Здоровье', value: 60, color: 'bg-green-500' },
                  { name: 'Обучение', value: 85, color: 'bg-blue-500' },
                  { name: 'Личное', value: 45, color: 'bg-orange-500' },
                ].map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-muted-foreground">{category.value}%</span>
                    </div>
                    <Progress value={category.value} className={`h-3 ${category.color}`} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;