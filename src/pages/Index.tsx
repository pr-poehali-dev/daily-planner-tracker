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
    { id: 1, name: 'Вода', icon: 'Droplet', current: 6, goal: 8, color: 'bg-blue-500' },
    { id: 2, name: 'Шаги', icon: 'Footprints', current: 7500, goal: 10000, color: 'bg-green-500' },
    { id: 3, name: 'Медитация', icon: 'Heart', current: 15, goal: 20, color: 'bg-purple-500' },
    { id: 4, name: 'Чтение', icon: 'BookOpen', current: 25, goal: 30, color: 'bg-orange-500' },
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
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    
    const dates: { [key: string]: Date } = {};
    daysOfWeek.forEach((day, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      dates[day] = date;
    });
    return dates;
  };

  const weekDates = getWeekDates();

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trackers.map((tracker) => {
                const percentage = (tracker.current / tracker.goal) * 100;
                return (
                  <Card key={tracker.id} className="border-2 shadow-xl hover:shadow-2xl transition-shadow bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className={`p-3 rounded-2xl ${tracker.color} bg-opacity-20`}>
                          <Icon name={tracker.icon} className={tracker.color.replace('bg-', 'text-')} size={24} />
                        </div>
                        <span>{tracker.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span>{tracker.current}</span>
                          <span className="text-muted-foreground">/ {tracker.goal}</span>
                        </div>
                        <Progress value={percentage} className="h-3" />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 rounded-xl">
                          <Icon name="Minus" size={16} />
                        </Button>
                        <Button size="sm" className={`flex-1 rounded-xl ${tracker.color} hover:opacity-90`}>
                          <Icon name="Plus" size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <Button className="w-full mt-4 h-12 text-lg rounded-xl bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
              <Icon name="Plus" className="mr-2" />
              Добавить трекер
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